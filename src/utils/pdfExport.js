import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Capture a DOM element and export it as a multi-page PDF.
 * @param {string} elementId ID of the element to capture.
 * @param {string} filename Output PDF file name.
 */
export const exportToPDF = async (elementId, filename = 'dashboard-report.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Export error: Target element #${elementId} not found in DOM.`);
    return;
  }
  
  try {
    // Add visual loading indicator during render
    const originalStyle = element.style.transition;
    element.style.transition = 'none'; // prevent animations from shifting during snapshot
    
    const isDark = document.documentElement.classList.contains('dark');
    
    const canvas = await html2canvas(element, {
      scale: 2, // improve layout rendering sharpness
      useCORS: true,
      logging: false,
      backgroundColor: isDark ? '#020617' : '#f8fafc', // match slate-950 and slate-50
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });
    
    element.style.transition = originalStyle;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 dimensions in mm
    const pageHeight = 295; // A4 printable page height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(filename);
  } catch (error) {
    console.error('PDF compiling failed:', error);
    throw error;
  }
};
