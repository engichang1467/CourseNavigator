/**
 * 
 * The function that was use for smaller data set
 */
const fs = require('fs');
const path = require('path')

 // Retrieve the courses data from compSciCourses.json
let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/compSciCourses.json"))
let courseData = JSON.parse(rawdata)

// Storing section input as hashmap
const courseCode = {'CMPT': 0, 'MATH': 1, 'MACM': 2}
const xxxCourseSections = {'XXX': 0, '1XX': 1, '2XX': 2, '3XX': 3, '4XX': 4, '5XX': 5, '6XX': 6, '7XX': 7, '8XX': 8, '9XX': 9}
const courseSections = {'1XX': 0, '2XX': 1, '3XX': 2, '4XX': 3, '5XX': 4, '6XX': 5, '7XX': 6, '8XX': 7, '9XX': 8}



// Desc: to search up class from the JSON file
const findClassRetire = (input) => {
    className = input[0].toUpperCase()
    if (className === "CMPT")
        var findCurrCourse = courseData['children'][courseCode[className]]['children'][cmptCourseSections[`${input[1][0]}XX`]]['children']
    else
        var findCurrCourse = courseData['children'][courseCode[className]]['children'][courseSections[`${input[1][0]}XX`]]['children']
    
    // iterate through the course sections
    for (let i = 0; i < findCurrCourse.length; i++)
    {
        // if (findCurrCourse[i])
        if (findCurrCourse[i]['name'] === `${className} ${input[1]}`)
        {
            // return "Found it" 
            return `${findCurrCourse[i]['name']} - ${findCurrCourse[i]['title']}\n\n${chopDesc(findCurrCourse[i]['description'])}\nCredits: ${findCurrCourse[i]['credits']}`
        }
    }
    return 'Sorry I can\'t find it, Please try again'
}

// Desc: split description into 2 part (course description and prerequisite)
const chopDesc = (description) => {

    var descArr = description.split(" ")
    var descTxt = ""
    var prereq = ""
    
    for (let i = 0; i < descArr.length; i++)
    {
        if (descArr[i] === "Prerequisite:")
        {
            var tmp = i
            break
        } else {
            descTxt += descArr[i] + " "
        }
    }
    
    for (let j = tmp; j < descArr.length; j++)
        prereq += descArr[j] + " "
    
    return `${descTxt}\n\n${prereq}`
}