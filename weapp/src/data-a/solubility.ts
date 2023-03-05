
const chartData = {
    "column": ["F<sup>−</sup>", "Cl<sup>−</sup>", "Br<sup>−</sup>", "I<sup>−</sup>", "O<sup>2−</sup>", "S<sup>2−</sup>", "Se<sup>2−</sup>", "N<sup>3−</sup>", "OH<sup>−</sup>", "CN<sup>−</sup>", "SCN<sup>−</sup>", "NO<sup>−</sup><sub>3</sub>", "C<sup></sup><sub>2</sub>H<sup></sup><sub>3</sub>O<sup>−</sup><sub>2</sub>", "CO<sup>2−</sup><sub>3</sub>", "SO<sup>2−</sup><sub>4</sub>", "C<sup></sup><sub>2</sub>O<sup>2−</sup><sub>4</sub>", "PO<sup>3−</sup><sub>4</sub>"],
    "row": ["NH<sup>+</sup><sub>4</sub>", "H<sup>+</sup>", "Li<sup>+</sup>", "Na<sup>+</sup>", "K<sup>+</sup>", "Rb<sup>+</sup>", "Cs<sup>+</sup>", "Be<sup>2+</sup>", "Mg<sup>2+</sup>", "Ca<sup>2+</sup>", "Sr<sup>2+</sup>", "Ba<sup>2+</sup>", "B<sup>3+</sup>", "Al<sup>3+</sup>", "Ga<sup>3+</sup>", "Mn<sup>2+</sup>", "Fe<sup>2+</sup>", "Co<sup>2+</sup>", "Ni<sup>2+</sup>", "Cu<sup>2+</sup>", "Zn<sup>2+</sup>", "Sn<sup>2+</sup>", "Hg<sup>2+</sup>", "Pb<sup>2+</sup>", "V<sup>3+</sup>", "Cr<sup>3+</sup>", "Fe<sup>3+</sup>", "Ti<sup>4+</sup>", "Ag<sup>+</sup>", "Au<sup>3+</sup>"],
    "content": [["S", "S", "S", "S", "S", "S", "R", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S"], ["S", "S", "S", "S", "S", "S", "sS", "S", "S", "S", "S", "S", "S", "S", "S", "S", "S"], ["sS", "S", "S", "S", "R", "R", "R", "R", "S", "S", "S", "S", "S", "S", "S", "S", "sS"], ["S", "S", "S", "S", "R", "R", "R", "R", "S", "S", "S", "S", "S", "S", "S", "S", "S"], ["S", "S", "S", "S", "R", "R", "R", "R", "S", "S", "S", "S", "S", "S", "S", "S", "S"], ["S", "S", "S", "S", "R", "R", "R", "?", "S", "S", "S", "S", "S", "S", "S", "I", "I"], ["S", "S", "S", "S", "R", "R", "R", "?", "S", "S", "S", "S", "S", "S", "S", "I", "S"], ["S", "S", "S", "R", "I", "R", "S", "R", "I", "S", "S", "S", "S", "I", "S", "I", "S"], ["sS", "S", "S", "S", "I", "R", "R", "R", "I", "S", "S", "S", "S", "I", "S", "sS", "I"], ["I", "S", "S", "S", "R", "R", "R", "R", "sS", "S", "S", "S", "S", "I", "sS", "I", "I"], ["sS", "S", "S", "S", "R", "sS", "I", "R", "S", "S", "S", "S", "S", "I", "I", "I", "sS"], ["sS", "S", "S", "S", "R", "S", "R", "S", "S", "S", "S", "S", "S", "sS", "I", "I", "I"], ["R", "S", "R", "S", "S", "R", "R", "I", "S", "S", "S", "X", "S", "?", "S", "?", "I"], ["S", "S", "S", "S", "I", "R", "R", "I", "I", "R", "S", "S", "S", "R", "S", "I", "I"], ["sS", "S", "S", "R", "I", "S", "R", "I", "I", "S", "S", "S", "S", "R", "sS", "?", "I"], ["S", "S", "S", "S", "I", "I", "I", "I", "I", "S", "I", "S", "S", "I", "S", "I", "I"], ["S", "S", "S", "S", "I", "I", "I", "I", "I", "S", "S", "S", "S", "I", "S", "I", "I"], ["S", "S", "S", "S", "I", "I", "I", "I", "I", "I", "S", "S", "S", "I", "S", "I", "I"], ["S", "S", "S", "S", "I", "I", "I", "I", "I", "I", "S", "S", "S", "I", "S", "I", "I"], ["sS", "S", "S", "X", "I", "I", "I", "I", "I", "I", "I", "S", "S", "R", "S", "I", "I"], ["sS", "S", "S", "S", "I", "I", "I", "R", "I", "I", "S", "S", "S", "I", "S", "I", "I"], ["S", "S", "S", "S", "I", "I", "I", "I", "I", "S", "sS", "S", "R", "I", "S", "sS", "I"], ["R", "S", "S", "I", "I", "I", "I", "R", "I", "S", "sS", "S", "S", "I", "R", "I", "I"], ["sS", "S", "sS", "sS", "I", "I", "I", "?", "I", "sS", "sS", "S", "S", "I", "I", "sS", "I"], ["I", "S", "S", "S", "I", "I", "?", "I", "?", "?", "S", "S", "?", "?", "S", "?", "I"], ["I", "sS", "sS", "S", "I", "I", "I", "I", "I", "S", "S", "S", "S", "I", "I", "?", "I"], ["S", "S", "S", "R", "I", "sS", "?", "I", "I", "S", "S", "S", "S", "R", "S", "sS", "I"], ["R", "R", "R", "R", "I", "I", "I", "?", "I", "?", "?", "S", "R", "?", "R", "I", "I"], ["S", "I", "I", "I", "I", "I", "I", "sS", "I", "I", "sS", "S", "S", "I", "sS", "I", "I"], ["I", "S", "sS", "I", "I", "I", "?", "I", "I", "S", "?", "S", "S", "I", "S", "?", "?"]]
}


const notes = {
    'S': {
      key: 'S',
      initial: '溶',
      value: '可溶/易溶',
      detail: '0.01 ~ 100 mL (溶解1g溶质所需要的水)'
    },
    'sS': {
      key: 'sS',
      initial: '微',
      value: '微溶',
      detail: '100 mL ~ 10 L'
    },
    'I': {
      key: 'I',
      initial: '不',
      value: '不溶',
      detail: '10 L及以上'
    },
    'X': {
      key: 'X',
      initial: '其',
      value: '其他',
      detail: ''
    },
    'R': {
      key: 'R',
      initial: '反',
      value: '与水发生反应',
      detail: ''
    },
    '?': {
      key: '?',
      initial: '?',
      value: '未知',
      detail: ''
    }
  }

export {
    chartData,
    notes
}