enum Categories {
  AlkaliMetals,
  AlkalineEarthMetals,
  Lanthanides,
  Actinides,
  TransitionMetals,
  OtherMetals,
  Metalloids,
  OtherNonmetals,
  Halogens,
  NobleGases,
}

const elementsCategories: Categories[] = [7,9,0,1,6,7,7,7,8,9,0,1,5,6,7,7,8,9,0,1,4,4,4,4,4,4,4,4,4,4,5,6,6,7,8,9,0,1,4,4,4,4,4,4,4,4,4,4,5,5,6,6,8,9,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,4,5,5,5,6,8,9,0,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,5,5,5,5,8,9,0,1]

const zhCNCategories = ['碱金属', '碱土金属', '镧系元素', '锕系元素', '过渡金属', '其他金属', '准金属', '其他非金属', '卤素', '稀有气体']

export {
  Categories,
  elementsCategories,
  zhCNCategories
}
