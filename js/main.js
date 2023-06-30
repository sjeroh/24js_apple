// (function(){})() //즉시 실행 함수!

(function () {
  let yOffset = 0; //전체 스크롤값
  let prevScrollHeight = 0; //지나간 스크롤 (활성화된 sectino 이전의 높이값)
  let currentScene = 0; //현재 씬자리.(화면에 보이는 section)
  let enterNewScene=false; // 새로운 씬에 진입했을때 알려주는 역할

  function setLayout() {
    //각 영역의 높이 값을 셋팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight
      //니 윈도우창 높이에 5배를 곱해서 넣어.
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    yOffset = pageYOffset;

    // 새로고침해도 페이지를 인식 할 수 있게 만들기.
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight
      if (totalScrollHeight >= yOffset) {
        currentScene = i
        break;
      }
    }

    document.body.setAttribute('id', `show-scene-${currentScene}`)

  } //setLayout


  function calcValues(value , currentYOffset){
    let rv;
    let scrollHeight_in = sceneInfo[currentScene].scrollHeight;
    let scrollRatio = currentYOffset/scrollHeight_in;

    if (value.length === 3){
      //value의 요소가 3개인지 확인
      //start-end 사이에 애니메이션이 실행.
      //시작점 구하기.
      let partScrollStart=value[2].start*scrollHeight_in;
      let partScrollEnd=value[2].end*scrollHeight_in;
      let partScrollHeight = partScrollEnd - partScrollStart;
      // 1번과 2번 사이 값을 height값이 된다. 비율상. 0.1 0.2라고 정의 해놓은것을 가져옴.

      if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){ // 구간의 시작지점과 끝지점 사이를 의미한다.
        // currentYOffset은 내가 스크롤 내린 지점을 의미 전체에서.
        rv=(currentYOffset -partScrollStart)/ partScrollHeight * (value[1]-value[0]+value[0])

      }else if(currentYOffset<partScrollStart){
        rv=value[0];
      }else if(currentYOffset>partScrollEnd){
        rv = value[1];
      }

    }else{
      rv=scrollRatio*(value[1]-value[0])+value[0]
    }


    return rv;
  }


  function playAnimation() {
    let objs= sceneInfo[currentScene].objs;
    let values= sceneInfo[currentScene].values;
    let currentYOffset = yOffset - prevScrollHeight;
    console.log(currentScene, currentYOffset)
    let scrollHeight_in_ani = sceneInfo[currentScene].scrollHeight;
    let scrollRatio_in_ani = currentYOffset/scrollHeight_in_ani;

    switch(currentScene){
      case 0:
        // console.log('0 play');
        if(scrollRatio_in_ani<=0.22){
          objs.MessageA.style.opacity = calcValues(values.messageA_opacity_in,currentYOffset)
          objs.MessageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in,currentYOffset)}%)`;
          //20%가 들어올 수 있다
        }else{
          objs.MessageA.style.opacity = calcValues(values.messageA_opacity_out,currentYOffset)
          objs.MessageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out,currentYOffset)}%)`;
          // 두개를(현재 스크롤 값과 현재 스크롤값 그리고 한 섹션 안에서의 위치를 비율로 계산한것.) 계산해서 -20% y축으로 올라가면서 마무리.
        }
        if (scrollRatio_in_ani <= 0.42) {
          // in
          objs.MessageB.style.opacity = calcValues(
            values.messageB_opacity_in,
            currentYOffset
          );
          objs.MessageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.MessageB.style.opacity = calcValues(
            values.messageB_opacity_out,
            currentYOffset
          );
          objs.MessageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio_in_ani <= 0.62) {
          // in
          objs.MessageC.style.opacity = calcValues(
            values.messageC_opacity_in,
            currentYOffset
          );
          objs.MessageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.MessageC.style.opacity = calcValues(
            values.messageC_opacity_out,
            currentYOffset
          );
          objs.MessageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        if (scrollRatio_in_ani <= 0.82) {
          // in
          objs.MessageD.style.opacity = calcValues(
            values.messageD_opacity_in,
            currentYOffset
          );
          objs.MessageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.MessageD.style.opacity = calcValues(
            values.messageD_opacity_out,
            currentYOffset
          );
          objs.MessageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
       
        break;
      case 1:
        // console.log('1 play');
        break;
      case 2:
        // console.log('2 play');
        if (scrollRatio_in_ani <= 0.25) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in,currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in,currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out,currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        if (scrollRatio_in_ani <= 0.57) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_in,
            currentYOffset
          );
          objs.pinB.style.transform = `scaleY(${calcValues(
            values.pinB_scaleY,
            currentYOffset
          )})`;
        } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_out,
            currentYOffset
          );
          objs.pinB.style.transform = `scaleY(${calcValues(
            values.pinB_scaleY,
            currentYOffset
          )})`;
        }
        if (scrollRatio_in_ani <= 0.83) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_in,
            currentYOffset
          );
          objs.pinC.style.transform = `scaleY(${calcValues(
            values.pinC_scaleY,
            currentYOffset
          )})`;
        } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_out,
            currentYOffset
          );
          objs.pinC.style.transform = `scaleY(${calcValues(
            values.pinC_scaleY,
            currentYOffset
          )})`;
        }
        break;
      case 3:
        // console.log('3 play');
        break;
    }
  }

  function scrollLoop() {
    enterNewScene=false;
    prevScrollHeight = 0;
    // 스크롤 움직일때마다 다시 계산하게 함 -안그러면 계속 더하기만 해버림
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene=true;
      currentScene++;
    }
    if (yOffset < prevScrollHeight) {
      enterNewScene=true;
      currentScene--;
    }
    // console.log(currentScene)
    document.body.setAttribute('id', `show-scene-${currentScene}`)
    
    if(enterNewScene)return; // 스크롤루프가 if문에 들어가서 실행중이라면 이
    //  스크롤 루프를 멈추게 함수를 벗어나라 --> 
    //  갑작스럽게 뒤로 돌려서 스크롤이 위로 올라갔을때 -값이 뜨게되는데 이것은 
    //  오류가 날 가능성이 높기 때문에 이것을 막기 위해서 실행을 잠깐 멈춰주는 
    //  역할을 한다.

    playAnimation();
  }

  //글자 애니메이션을 별도로 함수로 설정한다.
 


  window.addEventListener('scroll', () => {
    yOffset = pageYOffset
    // console.log(yOffset)
    scrollLoop();
  })

  window.addEventListener('resize', setLayout)
  window.addEventListener('load', setLayout)

  // setLayout();

})()