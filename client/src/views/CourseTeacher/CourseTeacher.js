import './CourseTeacher.css';

function CourseTeacher() {
    const subject = 'FRA000'
    return(
        <div>
            <div className="header">
                <ul>
                    <li>
                        <a href='/'>My class</a>
                    </li>
                    <li>
                        <a href='#'>{subject}</a>
                    </li>
                </ul>
                <p className='subject'>{subject}</p>
                <input className='search' type="text" name="search" placeholder='Search by Name or ID'/>
            </div>
            <div className='student-list'>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Score</th>
                        <th>Grade</th>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default CourseTeacher