const fs = require('fs');
const path = require('path')
const search = require('../src/search')

// Retrieve the courses data from compSciCourses.json
let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/compSciCourses.json"))
let courseData = JSON.parse(rawdata)


let rawdata2 = fs.readFileSync(path.resolve(__dirname,'../data/allCourses.json'))
let everyCourseData = JSON.parse(rawdata2)

// let courseCode = {'CMPT': 0, 'STAT': 1, 'MACM': 2}
// let cmptCourseSections = {'XXX': 0, '1XX': 1, '2XX': 2, '3XX': 3, '4XX': 4, '5XX': 5, '6XX': 6, '7XX': 7, '8XX': 8, '9XX': 9}
// let courseSections = {'1XX': 0, '2XX': 1, '3XX': 2, '4XX': 3, '5XX': 4, '6XX': 5, '7XX': 6, '8XX': 7, '9XX': 8}

// // console."STAT"
// // console.log(courseData['ch270re

// // console.log(courseData['children'][courseCode['MATH']]);


// // console.log(courseData['children'][courseCode['MATH']]['children']);

// // console.log(courseData['children'][courseCode['MATH']]['children'][0]['children'][0]);

// let currCourse = courseData['children'][courseCode['MATH']]['children'][courseSections['1XX']]['children'][0];



// const findClass = (input) => {
//     if (input[0] === "CMPT")
//         var findCurrCourse = courseData['children'][courseCode[input[0]]]['children'][cmptCourseSections[`${input[1][0]}XX`]]['children']
//     else
//         var findCurrCourse = courseData['children'][courseCode[input[0]]]['children'][courseSections[`${input[1][0]}XX`]]['children']
    
//     // iterate through the course sections
//     for (let i = 0; i < findCurrCourse.length; i++)
//     {
//         // if (findCurrCourse[i])
//         if (findCurrCourse[i]['name'] === `${input[0]} ${input[1]}`)
//         {
//             // Return the name, title, and description of the course
//             return `${findCurrCourse[i]['name']} - ${findCurrCourse[i]['title']}\n\n${findCurrCourse[i]['description']}`
//         }
//     }
//     return 'Sorry I can\'t find it, Please try again'
// }


let input = ["MATH", "150"]
// console.log(search.findClass(input))

// console.log(courseData['children'][courseCode[input[0]]]['children'][courseSections[`${input[1][0]}XX`]]['children'])

// let currCourse = courseData['children'][courseCode['MATH']]['children'][courseSections['1XX']]['children'][0];


// console.log(`${currCourse['name']} - ${currCourse['title']}\n${currCourse['description']}`)
// console.log(courseData['children'][courseCode['CMPT']]['children'][0]['children']);


var description = "The curriculum introduces students to topics in computer architecture that are considered fundamental to an understanding of the digital systems underpinnings of computer systems.  Prerequisite: Either (MACM 101 and ((CMPT 125 and CMPT 127) or CMPT 135)) or (MATH 151 and CMPT 102 for students in an Applied Physics program).   Students with credits for CMPT 150 or 250 may not take this course for further credit."

// console.log(search.chopDesc(description))


// GOAL: to do the same thing with all Courses
const xxxCourseSections = {'XXX': 0, '1XX': 1, '2XX': 2, '3XX': 3, '4XX': 4, '5XX': 5, '6XX': 6, '7XX': 7, '8XX': 8, '9XX': 9}
const courseSections = {'1XX': 0, '2XX': 1, '3XX': 2, '4XX': 3, '5XX': 4, '6XX': 5, '7XX': 6, '8XX': 7, '9XX': 8}
const courseHadXXX = ["CMPT", "FAL", "FAN"]


// console.log(facultySec[facultyName[0]])

// course with XXX: CMPT, FAL, FAN

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
    return "No clue"   
}

// console.log(checkFaculty("CMPT"))

// let input = ["MATH", "150"]
const facultyHash = {"Science": 0, "Applied Science": 1, "Arts and Social Science": 2, "Communication/Technology": 3, "Environment": 4, "Other": 5}

// console.log(everyCourseData['children'][checkFaculty("MATH")]['children'])



const checkClassName = (courseList, className) => {
    for (let i = 0; i < courseList.length; i++)
    {
        if (courseList[i]['name'] === className)
            return i
    }
    return null
}

const checkClassNum = (courseList, classNum) => {
    var num = `${classNum[0]}XX`
    for (let i = 0; i < courseList.length; i++)
    {
        if (courseList[i]['name'] === num)
            return i
    }
    return null
}


var facCourses = everyCourseData['children'][checkFaculty("CMPT")]['children']


// console.log(facCourses[checkClassName(facCourses, input[0])])
// console.log(facCourses[checkClassName(facCourses, input[0])]['children'])
var newCourses = facCourses[checkClassName(facCourses, "CMPT")]['children']
// console.log(newCourses)
// console.log(facCourses[checkClassName(facCourses, input[0])]['children'][checkClassNum(newCourses, '150')])
// console.log(checkClassNum(newCourses, '419'))


const findClass = (input) => {
    var className = input[0].toUpperCase()
    var checkClassExist = everyCourseData['children'][checkFaculty(className)]

    // Base case 1: return nothing if the course name does not exist
    if (checkClassExist  === undefined) 
        return 'Sorry I can\'t find it, Please try again'

    var facCourses = checkClassExist['children']                                                    // locate by faculty/department
    var classNameCourses = facCourses[checkClassName(facCourses, className)]['children']            // locate by course name

    var checkClassNumExist = classNameCourses[checkClassNum(classNameCourses, input[1])]
    
    // Base case 2: return nothing if the course number does not exist
    if (checkClassNumExist  === undefined) 
        return 'Sorry I can\'t find it, Please try again'

    var classNumCourses = checkClassNumExist['children']                                            // locate by course number

    // iterate through the course sections
    for (let i = 0; i < classNumCourses.length; i++)
    {
        // if we find the name 
        if (classNumCourses[i]['name'] === `${className} ${input[1].toUpperCase()}`)
        {
            // return the course information into this string format
            if (classNumCourses[i]["WQB"].length > 0)
                return `${classNumCourses[i]['name']} - ${classNumCourses[i]['title']}\n\n${chopDesc(classNumCourses[i]['description'])}\nCredits: ${classNumCourses[i]['credits']}\nWQB: ${classNumCourses[i]["WQB"]}`    
            else
                return `${classNumCourses[i]['name']} - ${classNumCourses[i]['title']}\n\n${chopDesc(classNumCourses[i]['description'])}\nCredits: ${classNumCourses[i]['credits']}`
        }
    }
    return 'Sorry I can\'t find it, Please try again'
}

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

var input2 = ["educ", "902b"]

console.log(findClass(input2))
// console.log(everyCourseData['children']["ABCD"] === undefined)

var input3 = ["STAT", "843"]

// console.log(findClass(input3))