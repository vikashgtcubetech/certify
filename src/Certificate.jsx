import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './certificate.css';
import './responsive.css'
// import certificatepng from './assets/certificate.png';

function Certificate() {
    const pdfRef = useRef();

    // Form state hooks
    const [name, setName] = useState('');
    const [fname, setFname] = useState('');
    const [of, setOf] = useState('');
    const [duraction, setDuraction] = useState('');
    const [startdate, setStartDate] = useState('');
    const [course, setCourse] = useState('');
    const [grade, setGrade] = useState('');
    const [issuedate, setIssueDate] = useState('');
    const [regnumber, setRegnumber] = useState('');

    const formatDate = (date) => {
        if (!date) return '';
        const dateObj = new Date(date);
        const day = String(dateObj.getDate()).padStart(2, '0'); // Ensure two digits for day
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObj); // Full month name
        const year = dateObj.getFullYear(); // Get the year
        return `${day} ${monthName} ${year}`;
    };

    const generatePdf = async () => {
        const element = pdfRef.current;
        if (!element) return;

        // Convert the element to a canvas
        const scale = 7;
        const canvas = await html2canvas(element, {
            scale,
            useCORS: true,
            logging: false,
            letterRendering: true,
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.85);

        // Create a new jsPDF instance
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Calculate width and height for the PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Save the PDF
        pdf.save('certificate.pdf');
    };

    return (
        <>
            <div>


                <div className='container'>

                    {/* Form to capture user input */}
                    <div className='main-left'>
                        <div className='top_heading'>
                            <h1 >Generate Certificate</h1>
                        </div>

                        <div>
                            <div className='first_label'>
                                <label>Issue Date: </label>
                                <input required type="date" placeholder='Issue Date' value={issuedate} onChange={(e) => setIssueDate(e.target.value)} />
                            </div>

                            <div className='second_label'>
                                <label>Register Number: </label>
                                <input required type="text" placeholder='Regitration Number' value={regnumber} onChange={(e) => setRegnumber(e.target.value)} />
                            </div>



                            <div>
                                <label>Student Name: </label>
                                <input required type="text" placeholder='Student Name' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label>Choose (S/O)/(D/O): </label>
                                <select required name="of" value={of} onChange={(e) => setOf(e.target.value)}>
                                    <option value="Choose">Choose</option>
                                    <option value="S/O">S/O</option>
                                    <option value="D/O">D/O</option>
                                </select>
                            </div>

                            <div>
                                <label>Father's Name: </label>
                                <input required type="text" placeholder='Father Name' value={fname} onChange={(e) => setFname(e.target.value)} />
                            </div>

                            <div>
                                <label>Duration (months): </label>
                                <input required type="number" placeholder='Duration' value={duraction} onChange={(e) => setDuraction(e.target.value)} />
                            </div>

                            <div>
                                <label>Course Name: </label>
                                <input required type="text" placeholder='Course Name' value={course} onChange={(e) => setCourse(e.target.value)} />
                            </div>

                            <div>
                                <label>Start Date: </label>
                                <input required type="date" placeholder='Start date' value={startdate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>

                            <div>
                                <label>Select Grade: </label>
                                <select required name="grade" value={grade} onChange={(e) => setGrade(e.target.value)}>
                                    <option value="Choose">Choose</option>
                                    <option value="A+">A+</option>
                                    <option value="A">A</option>
                                    <option value="B+">B+</option>
                                    <option value="B">B</option>
                                </select>
                            </div>

                            <div>
                                <button download onClick={generatePdf} style={{ padding: '10px 20px', fontSize: '16px' }}>
                                    Generate PDF
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className='right' ref={pdfRef}>
                        <div className='main-right'>
                            <div className='certificate-text'>
                                <div className='text-date'>
                                    <div className='issuedate'>
                                        <p>{formatDate(issuedate)}</p>
                                        <p>DATE OF ISSUE</p>
                                    </div>
                                    <div className='reg-number'>
                                        <p >aimc-{regnumber}</p>
                                        <p>Regitration No.</p>
                                    </div>
                                </div>
                                <div className='cert'>
                                    CERTIFICATE
                                </div>
                                <div className='achivement'>
                                    <p>OF ACHIEVEMENT</p>
                                    <img src="underline.svg" alt="" />
                                </div>
                                <div>
                                    <p className='certify'> THIS IS TO CERTIFY</p>
                                    <h1 className='s_name'>{name}</h1>
                                    <p className='of'>{of}</p>
                                    <h2 className='f_name'>{fname}</h2>
                                    <div className='has-succ'>Has Successfully Completed</div>
                                    <p className='duraction'>"{duraction} Months" OF</p>
                                    <h2 className='course'>{course}</h2>
                                    <p className='start-date'>from {formatDate(startdate)}</p>
                                    <p className='we-found'>We found him\her pretty active and <br /> confident in assigned projects.</p>
                                    <div className='institute'>
                                        <div className='sign'>
                                            <img src="signe.svg" alt="" />
                                            <hr />
                                            <div className='director-text'>
                                                <p className='director-name'>Makkhan Saini </p>
                                                <p className='director-of'> <span>DIRECTOR</span> <br />Aaradhana It & <br /> Management College</p>
                                            </div>

                                        </div>
                                        <div className='award'><img src="award.svg" alt="" /></div>
                                        <div className='seel'>
                                            <img src="seel.svg" alt="" />
                                            <p>ISO 9001 : 2008</p>
                                        </div>
                                    </div>
                                    <div className='grade-text'>Grade: A+ Above 75%, A 75% to 65%, B+ 65% to 50%, B Below 50%</div>
                                </div>
                            </div>
                            <div className='grade'>
                                <h1>{grade}</h1>
                            </div>
                            <div>

                            </div>


                        </div>
                    </div>



                </div>
            </div>
        </>
    );
}

export default Certificate;


{/* Certificate Preview */ }
{/* <div className='main-right' ref={pdfRef}>
                    <img src={certificatepng} alt="Certificate Background" />
                    <p className='issuedate'>{issuedate}</p>
                    <p className='reg-number'>{regnumber}</p>
                    <h1 className='s_name'>{name}</h1>
                    <p className='of'>{of}</p>
                    <h2 className='f_name'>{fname}</h2>
                    <p className='duraction'>"{duraction} Months"</p>
                    <h2 className='course'>{course}</h2>
                    <p className='start-date'>from {startdate}</p>
                    <div className='grade'>
                        <h1>{grade}</h1>
                    </div>
                </div> */}

{/* <p className='issuedate'>{issuedate}</p>
                    <p className='reg-number'>{regnumber}</p>
                    <h1 className='s_name'>{name}</h1>
                    <p className='of'>{of}</p>
                    <h2 className='f_name'>{fname}</h2>
                    <p className='duraction'>"{duraction} Months"</p>
                    <h2 className='course'>{course}</h2>
                    <p className='start-date'>from {startdate}</p>
                    <div className='grade'>
                        <h1>{grade}</h1>
                    </div> */}