const careContent = {
  context: ['C / 01', 'Context', 'เริ่มจากสถานการณ์จริงของศูนย์เฉพาะทาง: ปริมาณคนไข้ต่อวัน อัตรา no-show และรอยรั่วที่ต้องการแก้ให้ชัดเจน ก่อนกระโดดไปหาคำตอบ'],
  audience: ['A / 02', 'Audience', 'จำแนกผู้รับสารให้เฉพาะเจาะจง ตั้งแต่คนไข้พรีเมียมไทย นักท่องเที่ยวการแพทย์ ไปจนถึงครอบครัวที่ดูแลผู้สูงวัย'],
  role: ['R / 03', 'Role', 'กำหนดบทบาทของ AI ให้ชัดเจน เช่น นักการตลาดสุขภาพ นักวิเคราะห์ RCM หรือผู้ตรวจสอบความถูกต้องทางกฎหมาย'],
  ethics: ['E / 04', 'Ethics & Evidence', 'ทุกคำตอบต้องอยู่บนความปลอดภัยทางคลินิก ข้อบ่งชี้ทางการแพทย์ และหลักฐานที่ตรวจสอบได้ โดยไม่ชักชวนเกินความจำเป็น'],
  shape: ['S / 05', 'Shape', 'กำหนดรูปแบบผลลัพธ์ให้พร้อมใช้จริง ตั้งแต่ dashboard, script สำหรับทีมหน้าบ้าน ไปจนถึง prototype ของ workflow']
};

const detail = document.querySelector('#care-detail');
document.querySelectorAll('.care-card').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.care-card').forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
    const [index, title, copy] = careContent[card.dataset.care];
    detail.querySelector('.detail-index').textContent = index;
    detail.querySelector('h3').textContent = title;
    detail.querySelector('p').textContent = copy;
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));