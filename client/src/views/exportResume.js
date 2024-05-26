import jsPDF from 'jspdf';

const kanitBase64 = 'data:font/truetype;charset=utf-8;base64,...';

const exportResume = () => {
  const doc = new jsPDF();

  doc.addFileToVFS('Kanit-Medium.ttf', kanitBase64);
  doc.addFont('Kanit-Medium.ttf', 'Kanit', 'normal');
  doc.setFont('Kanit');
  
  doc.text("Resume", 10, 10);
  doc.text("First Name: jhvkjhv", 10, 20);
  doc.text("Last Name: waesr", 10, 30);
  doc.text("Nickname: sadgfh", 10, 40);
  doc.text("Student ID: 63340500001", 10, 50);
  doc.text("FRAB: 8", 10, 60);
  doc.text("Email: asfdfgjuh", 10, 70);
  doc.text("Tel: 0326146441", 10, 80);
  doc.text("Address: 126 Pracha Uthit Rd, Bang Mot, Thung Khru, Bangkok 10140", 10, 90);
  doc.text("High School Name: abcs", 10, 100);
  doc.text("Year of Study: 2014 to 2019", 10, 110);
  doc.text("Program: Science - Math", 10, 120);
  doc.text("GPAX: 5.55", 10, 130);
  doc.text("Unversity Name: King mongkut's university of technology thonburi", 10, 140);
  doc.text("Major: Institute of Field Robotics", 10, 150);
  doc.text("Year of Study: 2020 to 2024", 10, 160);
  doc.text("Program: 5", 10, 170);
  doc.text("Interests: Web apps", 10, 180);
  doc.text("Hard Skills: HTML", 10, 190);
  doc.text("Soft Skills: Communication", 10, 200);
  doc.text("Projects: 1", 10, 210);
  doc.text("Experiences: tgyighkgyik", 10, 220);
  doc.text("Awards: fhjygjtfuj", 10, 230);
  doc.text("Internships: WRGSS", 10, 240);

  doc.save('resume.pdf');
};

export default exportResume;
