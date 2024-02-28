export interface tableDataIF {
    school: string,
    grade: string,
    class: string,
    name: string
    scoreMath: string,
    scoreChina: string,
    scoreEnglish: string,
}
export interface labelListIF {
    label: string,
    prop: string,
}

export interface propsIF {
    labelList: Array<labelListIF>,
    tableData: Array<tableDataIF>,
}