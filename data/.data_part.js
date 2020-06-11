//元素周期表主表格信息
var elemBoxData = [
  ['0空'],
  ['1', 'H', '氢', '1.00794', 'h'], ['2', 'He', '氦', '4.002602', 'he'], ['3', 'Li', '锂', '6.941', 'li'], ['4', 'Be', '铍', '9.012182', 'be'], ['5', 'B', '硼', '10.811', 'b'], ['6', 'C', '碳', '12.0107', 'h'], ['7', 'N', '氮', '14.0067', 'h'], ['8', 'O', '氧', '15.9994', 'h'], ['9', 'F', '氟', '18.998403', 'f'], ['10', 'Ne', '氖', '20.1797', 'he'], ['11', 'Na', '钠', '22.989769', 'li'], ['12', 'Mg', '镁', '24.3050', 'be'], ['13', 'Al', '铝', '26.9815386', 'al'], ['14', 'Si', '硅', '28.0855', 'b'], ['15', 'P', '磷', '30.973762', 'h'], ['16', 'S', '硫', '32.065', 'h'], ['17', 'Cl', '氯', '35.453', 'f'], ['18', 'Ar', '氩', '39.948', 'he'], ['19', 'K', '钾', '39.0983', 'li'], ['20', 'Ca', '钙', '40.078', 'be'], ['21', 'Sc', '钪', '44.955912', 'sc'], ['22', 'Ti', '钛', '47.867', 'sc'], ['23', 'V', '钒', '50.9415', 'sc'], ['24', 'Cr', '铬', '51.9961', 'sc'], ['25', 'Mn', ' 锰', '54.938045', 'sc'], ['26', 'Fe', '铁', '55.845', 'sc'], ['27', 'Co', '钴', '58.933195', 'sc'], ['28', 'Ni', '镍', '58.6934', 'sc'], ['29', 'Cu', '铜', '63.546', 'sc'], ['30', 'Zn', '锌', '65.409', 'sc'], ['31', 'Ga', '镓', '69.723', 'al'], ['32', 'Ge', '锗', '72.64', 'b'], ['33', 'As', '砷', '74.92160', 'b'], ['34', 'Se', '硒', '78.96', 'h'], ['35', 'Br', '溴', '79.904', 'f'], ['36', 'Kr', '氪', '83.798', 'he'], ['37', 'Rb', '铷', '85.4678', 'li'], ['38', 'Sr', '锶', '87.62', 'be'], ['39', 'Y', '钇', '88.90585', 'sc'], ['40', 'Zr', '锆', '91.224', 'sc'], ['41', 'Nb', '铌', '92.90638', 'sc'], ['42', 'Mo', '钼', '95.94', 'sc'], ['43', 'Tc', '锝', '98.9063', 'sc'], ['44', 'Ru', '钌', '101.07', 'sc'], ['45', 'Rh', '铑', '102.90550', 'sc'], ['46', 'Pd', '钯', '106.42', 'sc'], ['47', 'Ag', '银', '107.8682', 'sc'], ['48', 'Cd', ' 镉', '112.411', 'sc'], ['49', 'In', '铟', '114.818', 'al'], ['50', 'Sn', '锡', '118.710', 'al'], ['51', 'Sb', '锑', '121.760', 'b'], ['52', 'Te', '碲', '127.60', 'b'], ['53', 'I', '碘', '126.90447', 'f'], ['54', 'Xe', '氙', '131.293', 'he'], ['55', 'Cs', '铯', '132.9054519', 'li'], ['56', 'Ba', '钡', '137.327', 'be'], ['57', 'La', '镧', '138.90547', 'la'], ['58', 'Ce', '铈', '140.116', 'la'], ['59', 'Pr', '镨', '140.9465', 'la'], ['60', 'Nd', '钕', '144.242', 'la'], ['61', 'Pm', ' 钷', '146.9151', 'la'], ['62', 'Sm', '钐', '150.36', 'la'], ['63', 'Eu', '铕', '151.964', 'la'], ['64', 'Gd', '钆', '157.25', 'la'], ['65', 'Tb', '铽', '158.92535', 'la'], ['66', 'Dy', '镝', '162.500', 'la'], ['67', 'Ho', '钬', '164.93032', 'la'], ['68', 'Er', '铒', '167.259', 'la'], ['69', 'Tm', '铥', '168.93421', 'la'], ['70', 'Yb', '镱', '173.04', 'la'], ['71', 'Lu', '镥', '174.967', 'la'], ['72', 'Hf', '铪', '178.49', 'sc'], ['73', 'Ta', '钽', '180.9479', 'sc'], ['74', 'W', '钨', '183.84', 'sc'], ['75', 'Re', '铼', '186.207', 'sc'], ['76', 'Os', '锇', '190.23', 'sc'], ['77', 'Ir', '铱', '192.217', 'sc'], ['78', 'Pt', '铂', '195.084', 'sc'], ['79', 'Au', '金', '196.966569', 'sc'], ['80', 'Hg', '汞', '200.59', 'sc'], ['81', 'Tl', '铊', '204.3833', 'al'], ['82', 'Pb', '铅', '207.2', 'al'], ['83', 'Bi', '铋', '208.98040', 'al'], ['84', 'Po', '钋', '208.9824', 'b'], ['85', 'At', '砹', '209.9871', 'f'], ['86', 'Rn', '氡', '222.0176', 'he'], ['87', 'Fr', '钫', '223.0197', 'li'], ['88', 'Ra', '镭', '226.0254', 'be'], ['89', 'Ac', '锕', '227.0278', 'ac'], ['90', 'Th', '钍', '232.03806', 'ac'], ['91', 'Pa', '镤', '231.03588', 'ac'], ['92', 'U', '铀', '238.02891', 'ac'], ['93', 'Np', '镎', '237.0482', 'ac'], ['94', 'Pu', '鈽', '244.0642', 'ac'], ['95', 'Am', '镅', '243.0614', 'ac'], ['96', 'Cm', '锔', '247.0703', 'ac'], ['97', 'Bk', '锫', '247.0703', 'ac'], ['98', 'Cf', '锎', '251.0796', 'ac'], ['99', 'Es', '锿', '252.0829', 'ac'], ['100', 'Fm', '镄', '257.0951', 'ac'], ['101', 'Md', '钔', '258.0951', 'ac'], ['102', 'No', '锘', '259.1009', 'ac'], ['103', 'Lr', '铹', '264.8657', 'ac'], ['104', 'Rf', '𬬻', '267.12153', 'sc'], ['105', 'Db', '𬭊', '270.130718', 'sc'], ['106', 'Sg', '𬭳', '272.13516', 'sc'], ['107', 'Bh', '𬭛', '274.142103', 'sc'], ['108', 'Hs', '𬭶', '276.648525', 'sc'], ['109', 'Mt', '鿏', '278.1548', 'sc'], ['110', 'Ds', '𫟼', '281.16206', 'sc'], ['111', 'Rg', '𬬭', '283.16843', 'sc'], ['112', 'Cn', '鿔', '285.17441', 'sc'], ['113', 'Nh', '鉨', '287.18105', 'al'], ['114', 'Fl', '𫓧', '289.19048', 'al'], ['115', 'Mc', '镆', '291.19438', 'al'], ['116', 'Lv', '𫟷', '293.20455', 'al'], ['117', 'Ts', '', '294.2106', 'f'], ['118', 'Og', '', '294.21456', 'he'], ['119', 'Uue', '', '316', 'li'], ['120', 'Ubn', '', '320', 'be'], /*['121', 'Ubu', '', '', 'ubu'], ['122', 'Ubb', '', '', 'ubu'], ['123', 'Ubt', '', '', 'ubu'], ['124', 'Ubq', '', '', 'ubu'], ['125', 'Ubp', '', '', 'ubu'], ['126', 'Ubh', '', '', 'ubu']*/
 
]

var tabledata = [{ 'ia': elemBoxData[1], 'iia': [], 'iiib': [], 'ivb': [], 'vb': [], 'vib': [], 'viib': [], 'viiia': [], 'viiib': [], 'viiic': [], 'ib': [], 'iib': [], 'iiia': [], 'iva': [], 'va': [], 'via': [], 'viia': [], 'o': elemBoxData[2] }, { 'ia': elemBoxData[3], 'iia': elemBoxData[4], 'iiib': [], 'ivb': [], 'vb': [], 'vib': [], 'viib': [], 'viiia': [], 'viiib': [], 'viiic': [], 'ib': [], 'iib': [], 'iiia': elemBoxData[5], 'iva': elemBoxData[6], 'va': elemBoxData[7], 'via': elemBoxData[8], 'viia': elemBoxData[9], 'o': elemBoxData[10] }, { 'ia': elemBoxData[11], 'iia': elemBoxData[12], 'iiib': [], 'ivb': [], 'vb': [], 'vib': [], 'viib': [], 'viiia': [], 'viiib': [], 'viiic': [], 'ib': [], 'iib': [], 'iiia': elemBoxData[13], 'iva': elemBoxData[14], 'va': elemBoxData[15], 'via': elemBoxData[16], 'viia': elemBoxData[17], 'o': elemBoxData[18] }, { 'ia': elemBoxData[19], 'iia': elemBoxData[20], 'iiib': elemBoxData[21], 'ivb': elemBoxData[22], 'vb': elemBoxData[23], 'vib': elemBoxData[24], 'viib': elemBoxData[25], 'viiia': elemBoxData[26], 'viiib': elemBoxData[27], 'viiic': elemBoxData[28], 'ib': elemBoxData[29], 'iib': elemBoxData[30], 'iiia': elemBoxData[31], 'iva': elemBoxData[32], 'va': elemBoxData[33], 'via': elemBoxData[34], 'viia': elemBoxData[35], 'o': elemBoxData[36] }, { 'ia': elemBoxData[37], 'iia': elemBoxData[38], 'iiib': elemBoxData[39], 'ivb': elemBoxData[40], 'vb': elemBoxData[41], 'vib': elemBoxData[42], 'viib': elemBoxData[43], 'viiia': elemBoxData[44], 'viiib': elemBoxData[45], 'viiic': elemBoxData[46], 'ib': elemBoxData[47], 'iib': elemBoxData[48], 'iiia': elemBoxData[49], 'iva': elemBoxData[50], 'va': elemBoxData[51], 'via': elemBoxData[52], 'viia': elemBoxData[53], 'o': elemBoxData[54] }, { 'ia': elemBoxData[55], 'iia': elemBoxData[56], 'iiib': ['57-71', '', '镧系', '', '']/*镧系*/, 'ivb': elemBoxData[72], 'vb': elemBoxData[73], 'vib': elemBoxData[74], 'viib': elemBoxData[75], 'viiia': elemBoxData[76], 'viiib': elemBoxData[77], 'viiic': elemBoxData[78], 'ib': elemBoxData[79], 'iib': elemBoxData[80], 'iiia': elemBoxData[81], 'iva': elemBoxData[82], 'va': elemBoxData[83], 'via': elemBoxData[84], 'viia': elemBoxData[85], 'o': elemBoxData[86] }, { 'ia': elemBoxData[87], 'iia': elemBoxData[88], 'iiib': ['89-103', '', '锕系', '', '']/*锕系*/, 'ivb': elemBoxData[104], 'vb': elemBoxData[105], 'vib': elemBoxData[106], 'viib': elemBoxData[107], 'viiia': elemBoxData[108], 'viiib': elemBoxData[109], 'viiic': elemBoxData[110], 'ib': elemBoxData[111], 'iib': elemBoxData[112], 'iiia': elemBoxData[113], 'iva': elemBoxData[114], 'va': elemBoxData[115], 'via': elemBoxData[116], 'viia': elemBoxData[117], 'o': elemBoxData[118] }, { 'ia': elemBoxData[119], 'iia': elemBoxData[120], 'iiib': []/*Ubu系*/, 'ivb': [], 'vb': [], 'vib': [], 'viib': [], 'viiia': [], 'viiib': [], 'viiic': [], 'ib': [], 'iib': [], 'iiia': [], 'iva': [], 'va': [], 'via': [], 'viia': [], 'o': [] }, { 'ia': [], 'iia': [], 'iiib': elemBoxData[57], 'ivb': elemBoxData[58], 'vb': elemBoxData[59], 'vib': elemBoxData[60], 'viib': elemBoxData[61], 'viiia': elemBoxData[62], 'viiib': elemBoxData[63], 'viiic': elemBoxData[64], 'ib': elemBoxData[65], 'iib': elemBoxData[66], 'iiia': elemBoxData[67], 'iva': elemBoxData[68], 'va': elemBoxData[69], 'via': elemBoxData[70], 'viia': elemBoxData[71], 'o': [] }, { 'ia': [], 'iia': [], 'iiib': elemBoxData[89], 'ivb': elemBoxData[90], 'vb': elemBoxData[91], 'vib': elemBoxData[92], 'viib': elemBoxData[93], 'viiia': elemBoxData[94], 'viiib': elemBoxData[95], 'viiic': elemBoxData[96], 'ib': elemBoxData[97], 'iib': elemBoxData[98], 'iiia': elemBoxData[99], 'iva': elemBoxData[100], 'va': elemBoxData[101], 'via': elemBoxData[102], 'viia': elemBoxData[103], 'o': [] }, { 'ia': [], 'iia': [], 'iiib': [], 'ivb': [], 'vb': [], 'vib': [], 'viib':[], 'viiia': [], 'viiib': [], 'viiic': [], 'ib': [], 'iib': [], 'iiia': [], 'iva': [], 'va': [], 'via': [], 'viia': [], 'o': [] }]


var signColor ={
  'h':'#e9db39',
  'he': '#4e1892',
  'li': '#dc143c',
  'be': '#2578b5',
  'b': '#cc3536',
  'al': '#0041a5',
  'f': '#005b5a',
  //'sc': '#ce9335',
  'sc': '#ff9c00',
  'la': '#a03e28',
  'ac': '#6a6834',
  'ubu': '#fff',
}
//电负性   原子序数为顺序
//从数组第1项开始，第0项空
var electronegativitylist = ['电负性', '2.20', '--', '0.98', '1.57', '2.04', '2.55', '3.04', '3.44', '3.98', '--', '0.93', '1.31', '1.61', '1.90', '2.19', '2.58', '3.16', '--', '0.82', '1.00', '--', '1.54', '--', '1.66', '1.55', '1.83', '1.88', '1.91', '1.90', '1.65', '1.81', '2.01', '2.18', '2.55', '2.96', '3.00', '0.82', '0.95', '1.22', '1.33', '1.6', '2.16', '1.9', '2.3', '2.28', '2.20', '1.93', '1.69', '1.78', '1.96', '2.05', '2.1', '2.66', '2.6', '0.79', '0.89', '1.10', '1.12', '1.13', '1.14', '1.13', '1.17', '1.2', '1.20', '1.2', '1.22', '1.23', '1.24', '1.25', '1.1', '1.27', '1.3', '1.5', '2.36', '1.9', '2.2', '2.20', '2.28', '2.54', '2.00', '1.62', '1.87', '2.02', '2.0', '2.2', '2.2', '0.7', '0.9', '1.1', '1.3', '1.5', '1.38', '1.36', '1.28', '1.3', '1.3', '1.3', '1.3', '1.3', '1.3', '1.3', '1.3', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--']

var enname = ['英文名', 'Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen', 'Fluorine', 'Neon', 'Sodium', 'Magnesium', 'Aluminium', 'Silicon', 'Phosphorus', 'Sulfur', 'Chlorine', 'Argon', 'Potassium', 'Calcium', 'Scandium', 'Titanium', 'Vanadium', 'Chromium', 'Manganese', 'Iron', 'Cobalt', 'Nickel', 'Copper', 'Zinc', 'Gallium', 'Germanium', 'Arsenic', 'Selenium', 'Bromine', 'Krypton', 'Rubidium', 'Strontium', 'Yttrium', 'Zirconium', 'Niobium', 'Molybdenum', 'Technetium', 'Ruthenium', 'Rhodium', 'Palladium', 'Silver', 'Cadmium', 'Indium', 'Tin', 'Antimony', 'Tellurium', 'Iodine', 'Xenon', 'Caesium', 'Barium', 'Lanthanum', 'Cerium', 'Praseodymium', 'Neodymium', 'Promethium', 'Samarium', 'Europium', 'Gadolinium', 'Terbium', 'Dysprosium', 'Holmium', 'Erbium', 'Thulium', 'Ytterbium', 'Lutetium', 'Hafnium', 'Tantalum', 'Tungsten', 'Rhenium', 'Osmium', 'Iridium', 'Platinum', 'Gold', 'Mercury', 'Thallium', 'Lead', 'Bismuth', 'Polonium', 'Astatine', 'Radon', 'Francium', 'Radium', 'Actinium', 'Thorium', 'Protactinium', 'Uranium', 'Neptunium', 'Plutonium', 'Americium', 'Curium', 'Berkelium', 'Californium', 'Einsteinium', 'Fermium', 'Mendelevium', 'Nobelium', 'Lawrencium', 'Rutherfordium', 'Dubnium', 'Seaborgium', 'Bohrium', 'Hassium', 'Meitnerium', 'Darmstadtium', 'Roentgenium', 'Copernicium', 'Nihonium', 'Flerovium', 'Moscovium', 'Livermorium', 'Tennessine', 'Oganesson', 'Ununennium', 'Unbinilium', '', '', '']

var atomicRadius = ['原子半径', '--', '--', '--', '112pm', '90pm', '--', '--', '--', '--', '--', '186pm', '160 pm', '143 pm', '111 pm', '--', '--', '--', '--', '227 pm', '197 pm', '162 pm', '147 pm', '134 pm', '128 pm', '127 pm', '126 pm', '125 pm', '124 pm', '128 pm', '134 pm', '135 pm', '122 pm', '119 pm', '120 pm', '120 pm', '--', '248 pm', '215 pm', '180 pm', '160 pm', '146 pm', '139 pm', '136 pm', '134 pm', '134 pm', '137 pm', '144 pm', '151 pm', '167 pm', '140 pm', '140 pm', '140 pm', '140 pm', '--', '265 pm', '222 pm', '187 pm', '181.8 pm', '182 pm', '181 pm', '183 pm', '180 pm', '180 pm', '180 pm', '177 pm', '178 pm', '176 pm', '176 pm', '176 pm', '176 pm', '174 pm', '159 pm', '146 pm', '139 pm', '137 pm', '135 pm', '136 pm', '139 pm', '144 pm', '151 pm', '170 pm', '175 pm', '156 pm', '168 pm', '--', '--', '--', '--', '--', '179 pm', '163 pm', '156 pm', '155 pm', '159 pm', '173 pm', '174 pm', '170 pm', '--', '--', '--', '--', '--', '--', '150 pm', '--', '132 pm', '128 pm', '126 pm', '122 pm', '118 pm', '114 pm', '147 pm', '170pm', '160 pm', '200 pm', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--']

var covalentRadius = ['共价半径','31±5pm', '28pm', '128±7pm', '96±3pm', '84±3pm', '69pm', '71±1pm', '66±2pm', '64pm', '58pm', '166±9pm', '141±7pm', '121±4 pm', '111 pm', '--', '105±3pm', '102±4 pm', '106±10pm', '203±12pm', '176±10 pm', '170±7 pm', '160±8 pm', '153±8 pm', '139±5 pm', '139±5pm，161±8pm', '132±3pm，152±6pm', '126±3pm，150±7pm', '124±4 pm', '132±4 pm', '122±4 pm', '122±3 pm', '--', '119±4 pm', '120±4 pm', '120±3 pm', '116±4 pm', '220±9 pm', '195±10 pm', '190±7 pm', '175±7 pm', '164±6 pm', '154±5 pm', '147±7 pm', '146±7 pm', '142±7 pm', '139±6 pm', '145±5 pm', '144±9 pm', '142±5 pm', '139±4 pm', '139±5 pm', '138±4 pm', '139±3 pm', '140±9 pm', '244±11 pm', '215±11 pm', '207±8 pm', '204±9 pm', '203±7 pm', '201±6 pm', '199 pm', '198±8 pm', '198±6 pm', '196±6 pm', '194±5 pm', '192±7 pm', '192±7 pm', '189±6 pm', '190±10 pm', '187±8 pm', '187±8 pm', '175±10 pm', '170±8 pm', '162±7 pm', '151±7 pm', '144±4 pm', '141±6 pm', '136±5 pm', '136±6 pm', '132±5 pm', '145±7 pm', '146±5 pm', '148±4 pm', '140±4 pm', '150 pm', '150 pm', '260pm', '221±2 pm', '215 pm', '206±6 pm', '200 pm', '196±7 pm', '190±1 pm', '187±1 pm', '180±6 pm', '169±3 pm', '--', '--', '--', '--', '--', '--', '--', '157pm', '149pm', '143pm', '141pm', '134pm', '129pm', "128pm", '121pm', '122 pm', '136pm', '143]pm', '162pm', '175pm']

var zhSpell = ['拼音', 'qīng', 'hài', 'lǐ', 'pī', 'péng', 'tàn', 'dàn', 'yǎng', 'fú', 'nǎi', 'nà', 'měi', 'lǚ', 'guī', 'lín', 'liú', 'lǜ', 'yà', 'jiǎ', 'gài', 'kàng', 'tài', 'fán', 'gè', 'měng', 'tiě', 'gǔ', 'niè', 'tóng', 'xīn', 'jiā', 'zhě', 'shēn', 'xī', 'xiù', 'kè', 'rú', 'sī', 'yǐ', 'gào', 'ní', 'mù', 'dé', 'liǎo', 'lǎo', 'bǎ', 'yín', 'gé', 'yīn', 'xī', 'tī', 'dì', 'diǎn', 'xiān', 'sè', 'bèi', 
'Lán', 'shì', 'pǔ', 'nǚ', 'pǒ', 'shān', 'yǒu', 'gá', 'tè', 'dī', 'huǒ', 'ěr', 'diū', 'yì', 'lǔ',
  'hā', 'tǎn', 'wū', 'lái', 'é', 'yī', 'bó', 'jīn', 'gǒng', 'tā', 'qiān', 'bì', 'pō', 'ài', 'dōng', 'fāng', 'léi', 'ā', 'tǔ', 'pú', 'yóu', 'ná', 'bù', 'méi', 'jū', 'péi', 'kāi', 'āi', 'fèi', 'mén', 'nuò', 'láo', 'lú', 'dù', 'xǐ', 'bō', 'hēi', 'mài', 'dá', 'lún', 'gē', 'fū', 'mò', 'lì', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--', '--'
]

//价电子构型
var VelectronConfig = ['价电子构型', '1s1', '1s2', '2s1', '2s2', '2s2 2p1', '2s2 2p2', '2s2 2p3', '2s2 2p4', '2s2 2p5', '2s2 2p6', '3s1', ' 3s2', '3s2 3p1', '3s2 3p2', '3s2 3p3', '3s2 3p4', '3s2 3p5', '3s2 3p6', '4s1', ' 4s2', ' 3d1 4s2', '3d2 4s2', '3d3 4s2', ' 3d5 4s1', '4s2 3d5', ' 3d6 4s2', ' 3d7 4s2', ' 3d8 4s2', ' 3d10 4s1', ' 3d10 4s2', ' 4s2 4p1', '4s2 4p2', '4s2 4p3', '4s2 4p4', '4s2 4p5', '4s2 4p6', '5s1', ' 5s2', '4d1 5s2', '4d2 5s2', '4d4 5s1', '4d5 5s1', '4d5 5s2', '4d7 5s1', '4d8 5s1', '4d10', '4d10 5s1', '4d105s2', '5s2 5p1', '5s2 5p2', '5s2 5p3', '5s2 5p4', '5s2 5p5', '5s2 5p6', '6s1', '6s2', '5d1 6s2', '4f1 5d1 6s2', '4f3 6s2', '4f4 6s2', '6s2 4f5', '4f6 6s2', '4f7 6s2', '4f7 5d1 6s2', '4f9 6s2', '4f10 6s2', '4f11 6s2', '4f12 6s2', '4f13 6s2', '4f14 6s2', '5d1 6s2', '5d2 6s2', '5d3 6s2', '5d4 6s2', '5d5 6s2', '5d6 6s2', '5d7 6s2', '5d9 6s1', '5d10 6s1', '5d10 6s2', '6s2 6p1', '6s2 6p2', '6s2 6p3', ' 6s2 6p4', '6s2 6p5', '6s2 6p6', ' 7s1', ' 7s2', ' 6d1 7s2', ' 6d2 7s2', '5f2 6d1 7s2', '5f3 6d1 7s2', '5f4 6d1 7s2', '5f5 6d1 7s2', '5f6 7s2', '5f7 7s2', '5f7 6d1 7s2', '5f9 7s2', '5f10 7s2 ', '5f11 7s2', '5f12 7s2', '5f13 7s2', '5f14 7s2', '6d1 7s2', '6d2 7s2', '6d3 7s2', '6d4 7s2', '6d5 7s2', '6d6 7s2', '6d8 7s2', '6d9 7s2', '6d10 7s2', '7s2 7p1', '7s2 7p2', '7s2 7p3', '7s2 7p4','7s2 7p5','7s2 7p6','8s1','8s2',''
]

//每层电子数
var elePerShell = ['每层电子数', '1', '2', '2,1', '2,2', '2,3', '2,4', '2,5', '2,6', '2,7', '2,8', '2,8,1', '2,8,2', '2,8,3', '2,8,4', '2,8,5', '2,8,6', '2,8,7', '2,8,8', '2,8,8,1', '2,8,8,2', '2,8,9,2', '2,8,10,2', '2,8,11,2', '2,8,12,2', '2,8,13,2', '2,8,14,2', '2,8,15,2', '2,8,16,2', '2,8,18,1', '2,8,18,2', '2,8,18,3', '2,8,18,4', '2,8,18,5', '2,8,18,6', '2,8,18,7', '2,8,18,8', '2,8,18,8,1', '2,8,18,8,2', '2,8,18,9,2', '2,8,18,10,2', '2,8,18,12,1', '2,8,18,13,1', '2,8,18,13,2', '2,8,18,15,1', '2,8,18,16,1', '2,8,18,18', '2,8,18,18,1', '2,8,18,18,2', '2,8,18,18,3', '2,8,18,18,4', '2,8,18,18,5', '2,8,18,18,6', '2,8,18,18,7', '2,8,18,18,8', '2,8,18,18,8,1', '2,8,18,18,8,2', '2,8,18,18,9,2', '2,8,18,19,9,2', '2,8,18,21,8,2', '2,8,18,22,8,2', '2,8,18,23,8,2', '2,8,18,24,8,2', '2,8,18,25,8,2', '2,8,18,25,9,2', '2,8,18,27,8,2', '2,8,18,28,8,2', '2,8,18,29,8,2', '2,8,18,30,8,2', '2,8,18,31,8,2', '2,8,18,32,8,2', '2,8,18,32,9,2', '2,8,18,32,10,2', '2,8,18,32,11,2', '2,8,18,32,12,2', '2,8,18,32,13,2', '2,8,18,32,14,2', '2,8,18,32,15,2', '2,8,18,32,17,1', '2,8,18,32,18,1', '2,8,18,32,18,2', '2,8,18,32,18,3', '2,8,18,32,18,4', '2,8,18,32,18,5', '2,8,18,32,18,6', '2,8,18,32,18,7', '2,8,18,32,18,8', '2,8,18,32,18,8,1', '2,8,18,32,18,8,2', '2,8,18,32,18,9,2', '2,8,18,32,18,10,2', '2,8,18,32,20,9,2', '2,8,18,32,21,9,2', '2,8,18,32,22,9,2', '2,8,18,32,24,8,2', '2,8,18,32,25,8,2', '2,8,18,32,25,9,2', '2,8,18,32,27,8,2', '2,8,18,32,28,8,2', '2,8,18,32,29,8,2', '2,8,18,32,30,8,2', '2,8,18,32,31,8,2', '2,8,18,32,32,8,2', '2,8,18,32,32,8,3', '2,8,18,32,32,10,2', '2,8,18,32,32,11,2', '2,8,18,32,32,12,2', '2,8,18,32,32,13,2', '2,8,18,32,32,14,2', '2,8,18,32,32,15,2', '2,8,18,32,32,17,1', '2,8,18,32,32,18,1', '2,8,18,32,32,18,2', '2,8,18,32,32,18,3', '2,8,18,32,32,18,4', '2,8,18,32,32,18,5', '2,8,18,32,32,18,6', '2,8,18,32,32,18,7', '2,8,18,32,32,18,8', '2,8,18,32,32,18,8,1', '2,8,18,32,32,18,8,2']

var tapElem = '35'

var elements_detail_data = 
  { "1": [{ "is": "imageCard", "data": ["H", "氢", "Hydrogen", "非金属", "1", "1.00794", "h"] }, { "is": "unit", "title": "概述", "icon": "", "data": [["族-周期-区", "IA-1-s"], ["价电子构型", "1s1"]] }, { "is": "unit", "title": "物理性质", "icon": "", "data": [["颜色", "无色"], ["物态", "气体"], ["熔点", "13.99K(-259.16℃，-434.49℉)"], ["沸点", "20.271K(-252.879℃，-423.182℉)"], ["密度", "0.08988g/L(0℃，101.325kPa)"], ["熔点时液体密度", "0.07g/cm3（固体：0.0763g/cm3）"], ["沸点时液体密度", "0.07099g/cm3"], ["三相点", "13.8033K(-259℃)，7.041kPa"], ["临界点", "32.938K，1.2858Mpa"], ["熔化热", "(H2)0.117KJ/mol"], ["汽化热", "(H2)0.904KJ/mol"], ["摩尔热容", "28.836/(mol·K)"]] }, { "is": "unit", "title": "原子性质", "icon": "", "data": [["氧化态", "-1,+1"], ["电负性", "鲍林标度：2.20"], ["电离能", "1st:1312.0KJ/mol"], ["共价半径", "37.1pm"], ["范德华半径", "120pm"], { "is": "template", "name": "spectralblock", "data": [""] }, { "is": "template", "name": "atomStructure", "data": ["1"] }] }, { "is": "unit", "title": "历史", "icon": "", "data": [["发现", "亨利·卡文迪什 Henry Cavendish(1766)"], ["命名", "安东万-罗伦·德·拉瓦节 Antoine Lavoisier(1783)"]] }, { "is": "unit", "title": "杂项", "icon": "", "data": [["晶体结构", "六方"], ["磁序", "抗磁性"], ["声速", "1310m/s(gas,27℃)"], ["热导率", "0.1805W/(m·k)"], ["CAS", "12385-13-6  1333-74-0(H2)"], ["磁序", "抗磁性"]] }], 
  "2": [{ "is": "imageCard", "data": ["He", "氦", "helium", "稀有气体", "2", "4.002602", "he"] }, { "is": "unit", "title": "概述", "icon": "", "data": [["族-周期-区", "0-1-s"], ["价电子构型", "1s2"]] }, { "is": "unit", "title": "物理性质", "icon": "", "data": [["物态", "气态"], ["熔点", "(at 2.5Mpa) 0.95K,-272.20℃，-457.96℉"], ["密度", "(0℃，101.325Kpa) 0.1786g/L"], ["熔点时液体密度", "0.145g/cm3"], ["沸点时液体密度", "0.125g/cm3"], ["沸点", "4.222K,-271℃,-452.20℉"], ["三相点", "2.177K(-271℃)，5.043kPa"], ["临界点", "5.1953K,0.22746MPa"], ["熔化热", "0.0138KJ/mol"], ["汽化热", "0.0829kJ/mol"], ["摩尔热容", "20.78J/(mol·K)"]] }, { "is": "unit", "title": "原子性质", "icon": "", "data": [["氧化态", "0"], ["电离能", "1st:2372.3kJ/mol  2nd:5250.5kJ/mol"], ["共价半径", "28pm"], ["范德华半径", "140pm"], { "is": "template", "name": "spectralblock", "data": [""] }, { "is": "template", "name": "atomStructure", "data": ["2"] }] }, { "is": "unit", "title": "历史", "icon": "", "data": [["发现", "Pierre Janssen, Norman Lockyer(1868)"], ["首次分离", "William Ramsay,Per Teodor Cleve,Abraham Langlet(1895)"]] }, { "is": "unit", "title": "杂项", "icon": "", "data": [["晶体结构", "六方密堆积"], ["磁序", "抗磁性"], ["热导率", "0.1513W/(m·K)"], ["声速", "972m/s"], ["CAS", "7440 -59-7"]] }], "3": [{ "is": "imageCard", "data": ["Li", "锂", "Lithium", "碱金属", "3", "6.941", "li"] }, { "is": "unit", "title": "概述", "icon": "", "data": [["族-周期-区", "IA-2-s"], ["价电子构型", "2s1"]] }, { "is": "unit", "title": "物理性质", "icon": "", "data": [["物态", "固态"], ["熔点", "453.69K,180.54℃，356.97℉"], ["沸点", "1615K,1342℃，2448℉"], ["密度", "(接近室温)0.534g/cm3"], ["熔点时液体密度", "0.512g/cm3"], ["熔化热", "3.00kJ/mol"], ["汽化热", "147.1kJ/mol"], ["摩尔热容", "24.860J/(mol·K)"]] }, { "is": "unit", "title": "原子性质", "icon": "", "data": [["氧化热", "+1，-1(强碱性氧化物)"], ["电负性", "0.98(鲍林标度)"], ["电离能", "1st:520.2kJ/mol 2nd:7298.1kJ/mol 3rd:11815.0kJ/mol"], ["共价半径", "128±7pm"], ["范德华半径", "182pm"], { "is": "template", "name": "spectralblock", "data": [""] }, { "is": "template", "name": "atomStructure", "data": ["2,1"] }] }, { "is": "unit", "title": "历史", "icon": "", "data": [] }, { "is": "unit", "title": "杂项", "icon": "", "data": [["晶体结构", "体心立方"], ["磁序", "顺磁性"], ["电阻率", "(20℃) 92.8n Ω/m"], ["热导率", "84.8W/(m·K)"], ["膨胀系数", "(25℃) 46µm/(m·K)"], ["声速(细棒)", "(20℃)6000m/s"], ["杨氏模量", "4.9GPa"], ["剪切模量", "4.2GPa"], ["莫氏硬度", "0.6"], ["CAS", "7439-93-2"]] }], "4": [{ "is": "imageCard", "data": ["Be", "铍", "Beryllium", "碱土金属", "4", "9.012182", "be"] }, { "is": "unit", "title": "概述", "icon": "", "data": [["族-周期-区", "IIA-2-s"], ["外观", "灰白色金属"], ["价电子构型", "2s2"]] }, { "is": "unit", "title": "物理性质", "icon": "", "data": [["物态", "固态"], ["熔点", "1560K,1287℃，2349℉"], ["沸点", "2742K,2469℃，4476℉"], ["密度", "(接近室温)1.85g/cm3"], ["熔化热", "12.2kJ/mol"], ["汽化热", "292kJ/mol"], ["摩尔热容", "16.443J/(mol·K)"]] }, { "is": "unit", "title": "原子性质", "icon": "", "data": [["氧化态", "+2，+1"], ["电负性", "1.57(鲍林标度)"], ["电离能", "1st:899.5kJ/mol  2nd:1757.1kJ/mol  3rd:14848.7kJ/mol"], ["原子半径", "112pm"], ["共价半径", "96±3pm"], ["范德华半径", "153pm"], { "is": "template", "name": "spectralblock", "data": [""] }, { "is": "template", "name": "atomStructure", "data": ["2,2"] }] }, { "is": "unit", "title": "历史", "icon": "", "data": [["发现", "Louis Nicolas Vauquelin(1798)"], ["首次分离", "Friedrich Wöhler & Antoine Bussy(1828)"]] }, { "is": "unit", "title": "杂项", "icon": "", "data": [["晶体结构", "六方密堆积"], ["磁序", "抗磁性"], ["电阻率", "(20℃)36nΩ/m"], ["热导率", "200W/(m·K)"], ["膨胀系数", "(25℃)11.3µm/(m·K"], ["声速(细棒)", "(室温)12890m/s"], ["杨氏模量", "287GPa"], ["剪切模量", "132GPa"], ["体积模量", "130GPa"], ["泊松比", "0.032"], ["莫氏硬度", "5.5"], ["维氏硬度", "1670MPa"], ["布氏硬度", "590-1320Mpa"], ["CAS", "7440-41-7"]] }], "19": [{ "is": "imageCard", "data": ["K", "钾", "Potassium", "碱金属", "19", "39.0983", "li"] }, { "is": "unit", "title": "概述", "icon": "", "data": [["族-周期-区", "IA-4-s"], ["价电子构型", "4s1"]] }, { "is": "unit", "title": "物理性质", "icon": "", "data": [["物态", "固体"], ["密度", "（接近室温）0.862 g/cm3"], ["熔点时液体密度", "0.828 g/cm3"], ["熔点", "336.53 K，63.38 °C，146.08 °F"], ["沸点", "1032 K，759 °C，1398 °F"], ["三相点", "336.35 K（63 °C）， kPa"], ["熔化热", "2.33 kJ/mol"], ["汽化热", "76.9 kJ/mol"], ["摩尔热容", "29.6 J/(mol·K)"]] }, { "is": "unit", "title": "原子性质", "icon": "", "data": [["氧化态", "+1（强碱性）"], ["电负性", "0.82（鲍林标度）"], ["电离能", "第一：418.8 kJ/mol第二：3052 kJ/mol第三：4420 kJ/mol（更多）"], ["原子半径", "227 pm"], ["共价半径", "203±12 pm"], ["范德华半径", "275 pm"], { "is": "template", "name": "spectralblock", "data": [""] }, { "is": "template", "name": "atomStructure", "data": ["2,8,8,1"] }] }, { "is": "unit", "title": "历史", "icon": "", "data": [["发现", "汉弗里·戴维（1807年）"], ["分离", "汉弗里·戴维（1807年）"]] }, { "is": "unit", "title": "杂项", "icon": "", "data": [["晶体结构", "体心立方"], ["磁序", "顺磁性"], ["电阻率", "（20 °C）72 n Ω/m"], ["热导率", "102.5 W/(m·K)"], ["膨胀系数", "（25 °C）83.3 µm/(m·K)"], ["声速（细棒）", "（20 °C）2000 m/s"], ["杨氏模量", "3.53 GPa"], ["剪切模量", "1.3 GPa"], ["体积模量", "3.1 GPa"], ["莫氏硬度", "0.4"], ["布氏硬度", "0.363 MPa"], ["CAS号", "7440-09-7"]] }]
  }


//元素详细界面请求数据，detail
function detaildata() {
 // console.log('=========detaildata========')
  //传原子序数(string)，加a表示获取位置
  var elem = tapElem
  try{
    var elemdata = elements_detail_data[elem]
    // elemdata = JSON.parse(JSON.stringify(elemdata))
  }catch(e){
    return ['-1']
  }

  //console.log(elem.concat('号元素'))
  //console.log(elemlist[elem][1][1])
    // var i = elem
    // if(elem==elemdata[1][4]){
    //   var position = elemdata[2][0][1].split("-", 2)
    //   var group = position[0].toLowerCase()
    //   //var viialist = ['','','','','','']
    //   if(group=="0"){group = "o"}
    //   else if(group=="viii" || group=="iiib" && parseInt(elemdata[1][4]) > 39){
    //     group = elemdata[2][0][2]
    //   }
    //   //表格中的位置
    //   var period = parseInt(position[1])
    //   //镧系，锕系位置修正
    //   if(period==6){
    //     if(elem>=57 && elem <72){
    //       period = 9
    //     }
    //   }else if(period==7){
    //     if(elem>=89 && elem <104){
    //       period =10
    //     }
    //   }else if(period==8){
    //     if(elem>=121 && elem<136){
    //       period =11
    //     }
    //   }

    //   console.log('周期'.concat(period))
    //   console.log('族'.concat(group))
    //   console.log('signColor:'.concat(tabledata[period - 1][group][4]))

    //   // 添加价电子构型
    //   console.log('=================elemdata==test==================')
    //   console.log(elemdata)
    //   elemdata[2].push(['价电子构型',VelectronConfig[i]])
    //   // 添加原子量
    //   elemdata[1][6] = tabledata[period - 1][group][3]
    //   // 添加标签色
    //   elemdata[1][7] = signColor[tabledata[period - 1][group][4]]
    //   // 添加电子层结构
    //   elemdata[4].push(["template", "atomStructure", elePerShell[i] ])
    //   console.log(elemdata)
    // }
  return elemdata
}


function getTableData(){
  return tabledata
}

function getSignColor(){
  return signColor
}

function setTapElem(thisTap){
  tapElem = thisTap
}

function getElemBoxData(elem){
  if(elem=='all'){
    return elemBoxData
  }else{
    return elemBoxData[elem]
  }
  
}


function getbottomdata(item){
  if(item == '电负性'){
    return electronegativitylist
  } else if (item == '英文名') {
    return enname
  }else if(item == '原子半径'){
    return atomicRadius
  }else if(item == '共价半径'){
    return covalentRadius
  }else if(item == '拼 音'){
    //注意空格
    return zhSpell
  }else if(item == '价电子构型'){
    return VelectronConfig
  }
}

//返回元素外层电子
function geteleShellData(elem){
  return elePerShell[elem]
}

module.exports={
  // 接口：函数
  detaildata:detaildata,
  getTableData:getTableData,
  getbottomdata:getbottomdata,
  getSignColor:getSignColor,
  setTapElem:setTapElem,
  getElemBoxData:getElemBoxData,
  geteleShellData:geteleShellData,
}