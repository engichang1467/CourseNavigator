const fs = require('fs');
const path = require('path')


// Retrieve the courses data from allCourses.json
let rawdata2 = fs.readFileSync(path.resolve(__dirname,'../data/allCourses.json'))
let everyCourseData = JSON.parse(rawdata2)



// Desc: the main function that search up the course informations
const findClass = (input) => {
    // Base case 1: return error when user's input is not in the right format
    if (input.length === 1 || input.length > 2)
        return "Please type the course name and number like the example (ex. cmpt 300)"

    var className = input[0].toUpperCase()
    var classNum = input[1].toUpperCase()
    var checkClassExist = everyCourseData['children'][checkFaculty(className)]

    // Base case 2: return 'course name not found' if the course name does not exist
    if (checkClassExist  === undefined) 
        return 'Sorry I can\'t find the course name, Please try again'

    var facCourses = checkClassExist['children']                                                    // locate by faculty/department
    var classNameCourses = facCourses[checkClassName(facCourses, className)]['children']            // locate by course name
    var checkClassNumExist = classNameCourses[checkClassNum(classNameCourses, input[1])]
    
    // Base case 3: return 'course number not found' if the course number does not exist
    if (checkClassNumExist  === undefined) 
        return 'Sorry I can\'t find the course number, Please try again'

    var classNumCourses = checkClassNumExist['children']                                            // locate by course number

    // Iterate through the course sections
    for (let i = 0; i < classNumCourses.length; i++)
    {
        // if we find the name 
        if (classNumCourses[i]['name'] === `${className} ${classNum}`)
        {
            // initialize the course object with descriptions & credits
            var courseInfo = `${classNumCourses[i]['name']} - ${classNumCourses[i]['title']}\n\n${chopDesc(classNumCourses[i]['description'])}\nCredits: ${classNumCourses[i]['credits']}`
            
            /**
             * return the course information into this string format
             * add WQB section if it has one
             */
            if (classNumCourses[i]["WQB"].length > 0)
                return `${courseInfo}\nWQB: ${classNumCourses[i]["WQB"]}\n\nLink: ${getUrl(className, classNum)}`    
            else
                return `${courseInfo}\n\nLink: ${getUrl(className, classNum)}`
        }
    }
    return 'Sorry I can\'t find it, Please try again'
}



// Desc: return the URL link to the course page
const getUrl = (courseName, courseNum) => {
    var date = new Date()
    var month = date.getMonth()+1
    var year = date.getFullYear()
    var term = ''
    var lowerCourseName = courseName.toLowerCase()
    var lowerCourseNum = courseNum.toLowerCase()

    if (month <= 4) {
        term = 'spring'
    } else if (month >= 5 && month <= 8) {
        term = 'summer'
    } else {
        term = 'fall'
    }

    return `http://www.sfu.ca/students/calendar/${year}/${term}/courses/${lowerCourseName}/${lowerCourseNum}.html`
}



// Desc: split description into 2 part (course description and prerequisite)
const chopDesc = (description) => {

    var descArr = description.split(" ")
    var descTxt = ""
    var prereq = ""
    
    for (let i = 0; i < descArr.length; i++)
    {
        if (descArr[i] === "Prerequisite:" || descArr[i] === "Corequisite:")
        {
            var tmp = i
            break
        }  
        else if(i === descArr.length-1)
        {
            // it will not add an extra space when index is close to the end
            descTxt += descArr[i]
            break
        } 
        else 
        {
            descTxt += descArr[i] + " "
        }
    }
    if (tmp)
    {
        for (let j = tmp; j < descArr.length; j++)
            prereq += descArr[j] + " "
        
        return `${descTxt}\n\n${prereq}`
    }
    return `${descTxt}`
}



// Desc: find the class name section based on the selected class name
const checkClassName = (courseList, className) => {
    for (let i = 0; i < courseList.length; i++)
    {
        if (courseList[i]['name'] === className)
            return i
    }
    return null
}



// Desc: find the right index from the facualty
const checkFaculty = (className) => {
    const facultyName = ["Science", "Applied Science", "Arts and Social Science", "Communication/Technology", "Environment", "Other"]
    const facultySec = {
        "Science": ["ACMA", "BISC", "BPK", "CHEM", "EASC", "MATH", "MBB", "PHYS", "SCI", "STAT"],
        "Applied Science": ["CMPT", "ENSC", "MACM", "MSE", "TEKX"],
        "Arts and Social Science": ["COGS", "CRIM", "ECON", "ENGL", "FNST", "FREN", "GSWS", "GERO", "GA", "HS", "HIST", "HUM", "IS", "LBST", "LAS", "LING", "PHIL", "POL", "PSYC", "SA", "WL"],
        "Communication/Technology": ["IAT", "PUB"],
        "Environment": ["ARCH", "ENV", "EVSC", "GEOG", "PLAN", "REM", "SD",],
        "Other": ["ALS", "APMA", "ARAB", "BUS", "CHIN", "CMNS", "CA", "DATA", "DIAL", "DMED", "ECO", "EDUC", "EDPR", "ETEC", "EAS", "FASS", "FNLG", "FAL", "FAN", "GS", "GERM", "GRK", "HSCI", "INS", "ISPO", "ITAL", "JAPN", "LANG", "LBRL", "LS", "MTEC", "MASC", "NEUR", "NUSC", "ONC", "PERS", "PLCY", "PUNJ", "SPAN", "SEE", "URB"]
    }
    const facultyHash = {"Science": 0, "Applied Science": 1, "Arts and Social Science": 2, "Communication/Technology": 3, "Environment": 4, "Other": 5}
    for (let i = 0; i < facultyName.length; i++)
    {
        if (facultySec[facultyName[i]].includes(className))
            return facultyHash[facultyName[i]]
    }
    return null   
}


// Desc: check the course number section
const checkClassNum = (courseList, classNum) => {
    var num = `${classNum[0]}XX`
    for (let i = 0; i < courseList.length; i++)
    {
        if (courseList[i]['name'] === num)
            return i
    }
    return null
}


module.exports = { findClass, chopDesc, checkClassName, checkFaculty, checkClassNum }
