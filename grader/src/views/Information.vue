<template>
  <div class="text-left">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />

    <div class="w3-container w3-animate-left">
      <h1>
        วิธีการใช้งาน
      </h1>
      <p>
        &#160;&#160;&#160;&#160;<a
          class="blink_me"
          href="https://google.com"
          target="popup"
          >____click____</a
        >
        (coming soon แต่ยังไม่มีใครทำแกล้งใส่ไว้ก่อนเฉย ๆ)
      </p>
    </div>
    <div class="w3-container w3-animate-right">
      <h1>
        คำถามที่พบบ่อย
      </h1>
      <p>
        Q: ข้อจำกัดของระบบมีอะไรบ้าง <br />
        A: ตัวระบบถูกออกแบบมาเพื่อฝึกฝนทักษะการเขียนโปรแกรมโดยมุ่งเน้นไปทางด้าน
        Algorithm จึงมีการบล็อค function/library บางตัว
      </p>
      <p>
        Q: ทำไมตอนรันในเครื่องตัวเองสามารถทำงานได้ปกติ
        แต่พอส่งแล้วถึงใช้งานไม่ได้ <br />
        A: ในบางกรณีโค้ตที่ทดสอบรันในเครื่องตัวเองสามารถทำงานได้
        แต่เมื่อนำมาทดสอบสอบบนเว็บไซต์ โดยเกิดได้จากหลายสาเหตุเช่น version ของ
        compiler ไม่ตรงกัน, std ไม่ตรงกัน, หรือแม้แต่การ optimize ของ compiler
        ไม่ตรงกัน เป็นต้น
      </p>
      <p>
        Q: แล้วถ้าเป็นแบบข้อข้างบนต้องแก้ไขอย่างไร <br />
        A: วิธีการแก้ไขจากข้อด้านบน ยกตัวอย่าง function gets ในภาษา c
        ซึ่งถูกนำออกไปจาก std 14 เนื่องจากเหตุทางด้านความปลอดภัย
        แต่สามารถใช้รูปแบบอื่นทดแทนได้เช่น การใช้ %[^\n]s หรือ getline(c++)
        เป็นต้น
      </p>
    </div>
    <div class="w3-container w3-animate-left">
      <h1>
        ระบบ compiler ถูกออกแบบมาด้วยลักษณะเฉพาะตัว จึงมี Error code
        ที่เพิ่มเติมขึ้นมาดังนี้
      </h1>
      <ul>
        <li>P : pass, คำตอบถูกต้องในเคสนั้นๆ</li>
        <li>- : fail, คำตอบผิดในเคสนั้น ๆ</li>
        <li>
          C : create file error, ไม่สามารถสร้างไฟล์สำหรับประมวลผลได้
          (อาจจะมาจากข้อผิดพลาดของระบบหรือผู้ใช้งานเอง)
        </li>
        <li>
          B : build error, เกิดจากการที่โค้ตไม่ถูกต้อง เช่น syntax error เป็นต้น
        </li>
        <li>F : function banned, ภายในโค้ตมีการใช้งานฟังก์ชันที่ถูกบล็อคไว้</li>
        <li>L : library banned, ภายในโค้ตมีการเรียกใช้ไลบรารีที่ถูกบล็อกไว้</li>
        <li>
          M : out of memory, โปรแกรมมีการใช้งานหน่วยความจำมากกว่าที่ระบบอนุญาติ
          (64 เมกะไบต์)
        </li>
        <li>
          T : timeout, โปรแกรมมีการทำงานมากกว่าเวลาที่ระบบอนุญาติ (1 วินาที)
        </li>
        <li>
          R : runtime error, โปรแกรมมีการทำงานที่ผิดพลาด เช่น out of array
          คือการเรียกใช้ array ในช่องที่ไม่ได้ประกาศไว้
        </li>
        <li>
          X : standard output error, เกิดข้อผิดพลาดจากการ output ของโปรแกรม
          (อาจจะเกิดจากตัวระบบเองหรือโค้ตก็ได้)
        </li>
        <li>
          W : wrong input/output from testcase, เกิดจากข้อผิดพลาดของ testcase
          กรุณาติดต่อ admin/staft
        </li>
        <li>O : Output oversized, เกิดจากขนาดของ output เกินที่กำหนดไว้</li>
      </ul>
    </div>

    <div class="w3-container w3-animate-zoom">
      <h4>
        author: eXitGuy [1/7/20] กำลังปรับปรุงแก้ไขอยู่นาจา
      </h4>
    </div>
    <div class="w3-container w3-animate-zoom">
      <pre>
Developer: {                       
    front-end : Glairy, 
    back-end : nonkung51,
    grader/compiler : eXitGuy,
    server : RedZero
 },
System: {
    server: Linux (Ubuntu) 64bit
    compiler: g++ (Ubuntu 6.5.0-2ubuntu1~18.04) 6.5.0
    std: c++14
    library: standard for MinGW
}
        </pre
      >
    </div>
  </div>
</template>

<style>
.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
};
</script>
