// Unit testing
const assert = require('chai').assert
const search = require('../src/search')

// Call out packages to retreve data
const fs = require('fs');
const path = require('path')

// Retrieve the courses data from allCourses.json
let rawdata2 = fs.readFileSync(path.resolve(__dirname,'../data/allCourses.json'))
let everyCourseData = JSON.parse(rawdata2)


// Desc: testing function checkFaculty
describe("Field test for checking faculty.", () => {
 
    it("Check if it will locate 'BPK' to the faculty of 'Science'.", () => {
        assert.deepEqual(search.checkFaculty("BPK"), 0)        
    })

    it("Check if it will locate 'CMPT' to the faculty of 'Applied Science'.", () => {
        assert.deepEqual(search.checkFaculty("CMPT"), 1)
    })

    it("Check if it will locate 'COGS' to the faculty of 'Arts and Social Science'.", () => {
        assert.deepEqual(search.checkFaculty("COGS"), 2)
    })

    it("Check if it will locate 'IAT' to the faculty of 'Communication/Technology'.", () => {
        assert.deepEqual(search.checkFaculty("IAT"), 3)
    })

    it("Check if it will locate 'GEOG' to the faculty of 'Environment'.", () => {
        assert.deepEqual(search.checkFaculty("GEOG"), 4)
    })

    it("Check if it will locate 'ALS' to the faculty of 'Other'.", () => {
        assert.deepEqual(search.checkFaculty("ALS"), 5)
    })

    it("Check if something is unknown.", () => {
        assert.deepEqual(search.checkFaculty("ABCD"), null)
    })
})


// Desc: testing function chopDesc
describe("Field test for spliting description string into two.", () => {

    let sampleDesc = 'The curriculum introduces students to topics in computer architecture that are considered fundamental to an understanding of the digital systems underpinnings of computer systems.  Prerequisite: Either (MACM 101 and ((CMPT 125 and CMPT 127) or CMPT 135)) or (MATH 151 and CMPT 102 for students in an Applied Physics program).   Students with credits for CMPT 150 or 250 may not take this course for further credit.'
    it("Split CMPT 295 information into 2.", () => {
        assert.deepEqual(search.chopDesc(sampleDesc).split("\n\n").length, 2)
    })

    let sampleDesc2 = 'MA project examined by two readers. Prerequisite: CMNS 801 and one of CMNS 800, CMNS 802 or CMNS 804.'
    it("Split CMNS 893 information into 2.", () => {
        assert.deepEqual(search.chopDesc(sampleDesc2).split("\n\n").length, 2)
    })

    let sampleDesc3 = 'Basic laws of probability, sample distributions. Introduction to statistical inference and applications.  Prerequisite: or Corequisite: MATH 152 or 155 or 158. Students wishing an intuitive appreciation of a broad range of statistical strategies may wish to take STAT 100 first.   Quantitative.'
    it("Split STAT 270 information into 2.", () => {
        assert.deepEqual(search.chopDesc(sampleDesc3).split("\n\n").length, 2)
    })

    let sampleDesc4 = 'Supervised enquiry in concentrated areas of specialization.'
    it("Check class (CMNS 880) with no prerequisite.", () => {
        assert.deepEqual(search.chopDesc(sampleDesc4).split("\n\n").length, 1)
    })

    let sampleDesc5 = ''
    it("Check class (BUS 770) with no course description.", () => {
        assert.deepEqual(search.chopDesc(sampleDesc5), '')
    })

})


// Desc: testing the function chopDesc
describe("Field test for checking course number.", () => {

    let facCourses = everyCourseData['children'][search.checkFaculty("MATH")]['children']
    let numCourses = facCourses[search.checkClassName(facCourses, "MATH")]['children']
    it("Check if MATH 150 is located at MATH 1XX section.", () => {
        assert.deepEqual(search.checkClassNum(numCourses, '150'), 0)
    })

    let facCourses2 = everyCourseData['children'][search.checkFaculty("CMPT")]['children']
    let numCourses2 = facCourses2[search.checkClassName(facCourses2, "CMPT")]['children']
    it("Check if CMPT XXX is located at CMPT XXX section.", () => {
        assert.deepEqual(search.checkClassNum(numCourses2, 'XXX'), 0)
    })

    let facCourses3 = everyCourseData['children'][search.checkFaculty("STAT")]['children']
    let numCourses3 = facCourses3[search.checkClassName(facCourses3, "STAT")]['children']
    it("Check if STAT 270 is located at CMPT 2XX section.", () => {
        assert.deepEqual(search.checkClassNum(numCourses3, '270'), 1)
    })

    let facCourses4 = everyCourseData['children'][search.checkFaculty("CMPT")]['children']
    let numCourses4 = facCourses4[search.checkClassName(facCourses4, "CMPT")]['children']
    it("Check if it can detect non-exist section.", () => {
        assert.deepEqual(search.checkClassNum(numCourses4, '000'), null)
    })

    let facCourses5 = everyCourseData['children'][search.checkFaculty("CMPT")]['children']
    let numCourses5 = facCourses5[search.checkClassName(facCourses5, "CMPT")]['children']
    it("Check if CMPT 419 is located at CMPT 4XX section.", () => {
        assert.deepEqual(search.checkClassNum(numCourses5, '419'), 4)
    })
})


// Desc: testing the function findClass
describe("Field test for finding course information (Main function)", () => {

    // Check cmpt 295
    let class1 = ["cmpt", "295"]
    let answer1 = "CMPT 295 - Introduction to Computer Systems\n\nThe curriculum introduces students to topics in computer architecture that are considered fundamental to an understanding of the digital systems underpinnings of computer systems.  \n\nPrerequisite: Either (MACM 101 and ((CMPT 125 and CMPT 127) or CMPT 135)) or (MATH 151 and CMPT 102 for students in an Applied Physics program).   Students with credits for CMPT 150 or 250 may not take this course for further credit. \nCredits: 3"
    it("Check if it can search CMPT 295.", () => {
        assert.deepEqual(search.findClass(class1), answer1)
    })

    // Check stat 843
    let class2 = ["stat", "843"]
    let answer2 = "STAT 843 - Functional Data Analysis\n\nAn introduction to smoothing and modelling of functional data. Basis expansion methods, functional\nregression models and derivative estimation are covered. \n\nPrerequisite: STAT 830 or permission of the instructor. \nCredits: 4"
    it("Check if it can search STAT 843.", () => {
        assert.deepEqual(search.findClass(class2), answer2)
    })

    // Check unknown course name
    let class3 = ["abcd", "000"]
    let answer3 = "Sorry I can't find the course name, Please try again"
    it("Check if it can detect unknown course name.", () => {
        assert.deepEqual(search.findClass(class3), answer3)
    })

    // Check unknown course number
    let class4 = ["cmpt", "000"]
    let answer4 = "Sorry I can't find the course number, Please try again"
    it("Check if it can detect unknown course number.", () => {
        assert.deepEqual(search.findClass(class4), answer4)
    })

    // Check cmpt 376w
    let class5 = ["cmpt", "376w"]
    let answer5 = "CMPT 376W - Technical Writing and Group Dynamics\n\nCovers professional writing in computing science, including format conventions and technical reports. Examines group dynamics, including team leadership, dispute resolution and collaborative writing. Also covers research methods. \n\nPrerequisite: CMPT 275 or CMPT 276.   Students with credit for CMPT 376 may not take this course for further credit. Writing. \nCredits: 3\nWQB: W"
    it("Check if it can search CMPT 376W (Class with WQB).", () => {
        assert.deepEqual(search.findClass(class5), answer5)
    })

    // Check hist 102w class with WQB
    let class6 = ["hist", "102w"]
    let answer6 = "HIST 102W - Canada since Confederation\n\nCanadian social, political, and economic history from 1867, examining aboriginal/settler relations, immigration, regionalism, foreign policy, economic development, culture, and political movements. Students with credit for HIST 102 may not take this course for further credit. Writing/Breadth-Humanities.\nCredits: 3\nWQB: W,B-Hum"
    it("Check if it can search HIST 102W (Class with WQB).", () => {
        assert.deepEqual(search.findClass(class6), answer6)
    })

    // Check educ 902b
    let class7 = ["educ", "902b"]
    let answer7 = "EDUC 902B - Interdisciplinary Seminar in Contemporary Educational Theory B\n\nA further consideration of concepts explored in the EDUC 902 \"A\" course, with a view to providing students with opportunities to apply these ideas within their own educational settings. \n\nCorequisite: EDUC 902A.\nCredits: 3"
    it("Check if it can search EDUC 902B.", () => {
        assert.deepEqual(search.findClass(class6), answer6)
    })

    // check if its incomplete
    let class8 = ["cmpt"]
    let answer8 = "Please type the course name and number like the example (ex. cmpt 300)"
    it("Check if the user input is incomplete", () => {
        assert.deepEqual(search.findClass(class8), answer8)
    })

    // Check if the input has too many arguments
    let class9 = ["asd", "asd", "asd"]
    let answer9 = "Please type the course name and number like the example (ex. cmpt 300)"
    it("Check if the input has too many arguments", () => {
        assert.deepEqual(search.findClass(class9), answer9)
    })
})