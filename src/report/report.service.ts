import { Injectable, Logger } from '@nestjs/common';
import PDFKit from 'pdfkit';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import { db } from 'src/db';
import { CalificationReport } from 'src/interfaces/Calification';
import { SemesterService } from 'src/semester/semester.service';


import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportService {
  public async getById(data: number): Promise<any> {
    try {
      return await db.report.getReportPath(data);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  public async deleteReportAfterDownload(path: string): Promise<any> {
    try {
      return await db.report.deleteReportAfterDownload(path);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  async test(alumnsData: CalificationReport[], isFirstSemester: boolean): Promise<any> {
    const doc = new PDFKit;
    const fileName = `${moment().format('DDMMYYYhhmmss')}file.pdf`;
    const filePath = path.resolve(__dirname, `../../public/reports/${fileName}`);

    doc.pipe(fs.createWriteStream(filePath));

    if (!isFirstSemester) {
      alumnsData.forEach((alumnData) => {
        this.drawTableLines(doc);
        doc.image(path.resolve(__dirname, `../../public/logo.png`), 20, 20, {
          fit: [50, 70],
          align: 'left',
        });
        doc.fontSize(7);
        doc.text('Escuela Paul Harris', 75, 20);
        doc.text('escuela.paulharris@educacionelbosque.cl', 75, 30);
        doc.text('Santa Águeda 1382', 75, 40);
        doc.text('El Bosque', 75, 50);
        doc.moveDown(5);
        doc.fontSize(12);
        doc.text(`INFORME DE NOTAS ANUALES`, {
          width: 410,
          align: 'center'
        }
        ).fontSize(9);
        doc.text(`Planes y Programas Decreto N° 2960 exento del 19-12-2012
Reglamento de Evaluación y Promoción Escolar Decreto Exento N° 511 del año 1997
Decreto N° 824 del año 1986 Rol Base de Datos N°9718-7`, {
          width: 410,
          align: 'center'
        });
        doc.moveDown(5);
        doc.text('Run alumno:', 395, 160);
        doc.text('Fecha:', 395, 180);
        doc.text('Notas parciales segundo semestre', 250, 200);
        doc.text('P1°S', 485, 200);
        doc.text('P2°S', 515, 200);
        doc.text('P.F.', 545, 200);
        this.row(doc, 150);//1
        doc.text('Nombre:', 35, 160);//nombre
        this.row(doc, 170);//2
        doc.text('Curso:', 35, 180);
        this.row(doc, 190);//3
        doc.text('Asignaturas', 35, 200);
        this.row(doc, 210);
        // //    doc.text('Lenguaje y Comunicación', 35, 220);
        this.row(doc, 230);
        // //    doc.text('Idioma extranjero Inglés', 35, 240);
        this.row(doc, 250);
        // //   doc.text('Matemática', 35, 260);
        this.row(doc, 270);
        // //  doc.text('Historia y Geografía y Ciencias Sociales', 35, 280);
        this.row(doc, 290);
        // //  doc.text('Ciencias Naturales', 35, 300);
        this.row(doc, 310);
        // //  doc.text('Artes Visuales', 35, 320);
        this.row(doc, 330);
        // //  doc.text('Música', 35, 340);
        this.row(doc, 350);
        // //   doc.text('Educación Física  y Salud', 35, 360);
        this.row(doc, 370);
        //  doc.text('Tecnología ', 35, 380);
        this.row(doc, 390);
        doc.text('Promedio General', 35, 400);
        doc.text('José Nazar Clavería', 420, 658);
        doc.text('Profesor(a) Jefe', 100, 670);
        doc.text('Director', 460, 670);
        //nombre 
        doc.text(alumnData.alumnFullName, 75, 160);
        //run
        doc.text(alumnData.run, 450, 160);
        //curso
        doc.text(alumnData.grade, 65, 180);
        // fecha
        doc.text(moment().format("DD-MM-YYYY"), 425, 180); //TODO poner fecha actual
        let x = 220;
        let y = 220;
        const startOn = 35;
        let total = 0;
        let total1s = 0;
        let total2s = 0;
        alumnData.subjects.forEach((subject) => {
          this.row(doc, x - 10);
          doc.text(subject.name, 35, y);
          subject.califications.forEach((c) => {
            doc.text(c, x, y);
            x += 30;
          });
          //   doc.text(subject.firstSemesterAvg, 490, y); //1er semestre
          const a = subject.califications.reduce((a, b) => a + b, 0);
          let avg = (a) / subject.califications.length;

          doc.text(Number((avg).toFixed(1)), 490, y);// 2do semestre

          //    let totalAvg = (avg + subject.firstSemesterAvg) / 2;
          //  doc.text(Number((totalAvg).toFixed(1)), 550, y); //final
          //  total += totalAvg;  //final
          total1s += avg;

          //    total2s += avg;
          y += 20;
          x = 220;
        });
        ///////////notas//
        // doc.text('N1', 220, 220);
        // doc.text('N2', 250, 220);
        // doc.text('N3', 280, 220);
        // doc.text('N4', 310, 220);
        // doc.text('N5', 340, 220);
        // doc.text('N6', 370, 220);
        // doc.text('N7', 400, 220);
        // doc.text('N8', 430, 220);
        // doc.text('N9', 460, 220);
        // promedios

        doc.text(Number((total1s / alumnData.subjects.length).toFixed(1)), 490, 400);//final 1s
        // doc.text('2S', 520, 220);
        //  doc.text(Number((total2s / alumnData.subjects.length).toFixed(1)), 520, 400);//final 2s
        //   
        //  doc.text(Number((total / alumnData.subjects.length).toFixed(1)), 550, 400);// final
        // nombre profesor
        doc.text(alumnData.headTeacher, 60, 658);
        doc.addPage();
      });


    } else {

      alumnsData.forEach((alumnData) => {
        this.drawTableLines(doc);
        doc.image(path.resolve(__dirname, `../../public/logo.png`), 20, 20, {
          fit: [50, 70],
          align: 'left',
        });
        doc.fontSize(7);
        doc.text('Escuela Paul Harris', 75, 20);
        doc.text('escuela.paulharris@educacionelbosque.cl', 75, 30);
        doc.text('Santa Águeda 1382', 75, 40);
        doc.text('El Bosque', 75, 50);
        doc.moveDown(5);
        doc.fontSize(12);
        doc.text(`INFORME DE NOTAS ANUALES`, {
          width: 410,
          align: 'center'
        }
        ).fontSize(9);
        doc.text(`Planes y Programas Decreto N° 2960 exento del 19-12-2012
Reglamento de Evaluación y Promoción Escolar Decreto Exento N° 511 del año 1997
Decreto N° 824 del año 1986 Rol Base de Datos N°9718-7`, {
          width: 410,
          align: 'center'
        });
        doc.moveDown(5);
        doc.text('Run alumno:', 395, 160);
        doc.text('Fecha:', 395, 180);
        doc.text('Notas parciales segundo semestre', 250, 200);
        doc.text('P1°S', 485, 200);
        doc.text('P2°S', 515, 200);
        doc.text('P.F.', 545, 200);
        this.row(doc, 150);//1
        doc.text('Nombre:', 35, 160);//nombre
        this.row(doc, 170);//2
        doc.text('Curso:', 35, 180);
        this.row(doc, 190);//3
        doc.text('Asignaturas', 35, 200);
        this.row(doc, 210);
        // //    doc.text('Lenguaje y Comunicación', 35, 220);
        this.row(doc, 230);
        // //    doc.text('Idioma extranjero Inglés', 35, 240);
        this.row(doc, 250);
        // //   doc.text('Matemática', 35, 260);
        this.row(doc, 270);
        // //  doc.text('Historia y Geografía y Ciencias Sociales', 35, 280);
        this.row(doc, 290);
        // //  doc.text('Ciencias Naturales', 35, 300);
        this.row(doc, 310);
        // //  doc.text('Artes Visuales', 35, 320);
        this.row(doc, 330);
        // //  doc.text('Música', 35, 340);
        this.row(doc, 350);
        // //   doc.text('Educación Física  y Salud', 35, 360);
        this.row(doc, 370);
        //  doc.text('Tecnología ', 35, 380);
        this.row(doc, 390);
        doc.text('Promedio General', 35, 400);
        doc.text('José Nazar Clavería', 420, 658);
        doc.text('Profesor(a) Jefe', 100, 670);
        doc.text('Director', 460, 670);
        //nombre 
        doc.text(alumnData.alumnFullName, 75, 160);
        //run
        doc.text(alumnData.run, 450, 160);
        //curso
        doc.text(alumnData.grade, 65, 180);
        // fecha
        doc.text(moment().format("DD-MM-YYYY"), 425, 180); //TODO poner fecha actual
        let x = 220;
        let y = 220;
        const startOn = 35;
        let total = 0;
        let total1s = 0;
        let total2s = 0;
        alumnData.subjects.forEach((subject) => {
          this.row(doc, x - 10);
          doc.text(subject.name, 35, y);
          subject.califications.forEach((c) => {
            doc.text(c, x, y);
            x += 30;
          });
          doc.text(subject.firstSemesterAvg, 490, y); //1er semestre
          const a = subject.califications.reduce((a, b) => a + b, 0);
          let avg = (a) / subject.califications.length;

          doc.text(Number((avg).toFixed(1)), 520, y);// 2do semestre

          let totalAvg = (avg + subject.firstSemesterAvg) / 2;
          doc.text(Number((totalAvg).toFixed(1)), 550, y); //final
          total += totalAvg;  //final
          total1s += subject.firstSemesterAvg;
          total2s += avg;
          y += 20;
          x = 220;
        });
        ///////////notas//
        // doc.text('N1', 220, 220);
        // doc.text('N2', 250, 220);
        // doc.text('N3', 280, 220);
        // doc.text('N4', 310, 220);
        // doc.text('N5', 340, 220);
        // doc.text('N6', 370, 220);
        // doc.text('N7', 400, 220);
        // doc.text('N8', 430, 220);
        // doc.text('N9', 460, 220);
        // promedios

        doc.text(Number((total1s / alumnData.subjects.length).toFixed(1)), 490, 400);//final 1s
        // doc.text('2S', 520, 220);
        doc.text(Number((total2s / alumnData.subjects.length).toFixed(1)), 520, 400);//final 2s
        //   
        doc.text(Number((total / alumnData.subjects.length).toFixed(1)), 550, 400);// final
        // nombre profesor
        doc.text(alumnData.headTeacher, 60, 658);
        doc.addPage();
      });
    }
    doc.end();
    return await db.alumn.addReport({ path: filePath });

  }


  textInRowFirst(doc, text, height) {
    doc.y = height;
    doc.x = 30;
    doc.fillColor('black');
    doc.text(text, {
      paragraphGap: 5,
      indent: 5,
      align: 'justify',
      columns: 1,
    });
    return doc;
  }
  line(doc, text, x, y) {
    doc.y = y;
    doc.x = x;
    doc.fillColor('black');
    doc.text(text, {
      paragraphGap: 5,
      indent: 5,
      align: 'justify',
      columns: 1,
    });
    return doc;
  }

  row(doc, height) {
    doc.lineJoin('miter')
      .rect(30, height, 550, 20)
      .stroke();
    return doc;
  }

  drawTableLines(doc: any) {
    doc.lineCap('butt')
      .moveTo(390, 150)
      .lineTo(390, 190)
      .stroke();// primeras 2 lineas

    //recuadros de nota
    doc.lineCap('butt')
      .moveTo(210, 190)
      .lineTo(210, 390)
      .stroke();
    doc.lineCap('butt')
      .moveTo(210, 210)
      .lineTo(210, 390)
      .stroke();
    doc.lineCap('butt')
      .moveTo(240, 210)
      .lineTo(240, 390)
      .stroke();
    doc.lineCap('butt')
      .moveTo(270, 210)
      .lineTo(270, 390)
      .stroke();
    doc.lineCap('butt')
      .moveTo(300, 210)
      .lineTo(300, 390)
      .stroke();
    doc.lineCap('butt')
      .moveTo(330, 210)
      .lineTo(330, 390)
      .stroke();
    doc.lineCap('butt')
      .moveTo(360, 210)
      .lineTo(360, 390)
      .stroke();
    doc.lineCap('butt')
      .moveTo(390, 210)
      .lineTo(390, 390)
      .stroke();
    doc.lineCap('butt')
      .moveTo(420, 210)
      .lineTo(420, 390)
      .stroke();
    doc.lineCap('butt')
      .moveTo(450, 210)
      .lineTo(450, 390)
      .stroke();
    doc.lineCap('butt')
      .moveTo(480, 190)
      .lineTo(480, 410)
      .stroke();
    doc.lineCap('butt')
      .moveTo(510, 190)
      .lineTo(510, 410)
      .stroke();
    doc.lineCap('butt')
      .moveTo(540, 190)
      .lineTo(540, 410)
      .stroke();

    doc.lineCap('butt')
      .moveTo(50, 650)
      .lineTo(200, 650)
      .stroke();
    doc.lineCap('butt')
      .moveTo(400, 650)
      .lineTo(550, 650)
      .stroke();
  }



}
