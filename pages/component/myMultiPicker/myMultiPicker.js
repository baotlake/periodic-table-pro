//记录上次pickerValue值
var lastValue = null

Component({
  //externalClasses: ['pickerBox-class'],
  properties:{
    range:{
      type:Array,
      value: []
    },
    rankTip:{
      type:Array,
      value:['公制','英制','市制']
    },
    isShow:{
      type:Boolean,
      value:true
    },
    pickerBoxClass:{
      type:String,
      value:'width:100%;height:100%;position:relative;z-index:inherit;'
    }

  },
  data:{
    nowSlideRanK:null,
    nowSelectValue:'',
  },
  methods:{
    myMultiPickerBindChange: function (event) {
      //console.log(event.detail)
      var nowValue = event.detail.value
      console.log(nowValue)
      if(lastValue != null){
        console.log('nowSlideRank循环前1')
        for(var i in lastValue){
          console.log('for i in lastValue')
          if(lastValue[i]!=nowValue[i]){
            if(this.data.nowSlideRank!=i){
              this.setData({
                nowSlideRank: i,
              })
              console.log('nowSlideRank赋值')
            }
          }
        }

        if (this.data.nowSelectValue != this.properties.range[this.data.nowSlideRank][nowValue[this.data.nowSlideRank]]) {
          console.log('nowSelectValue值发生变化')
          this.setData({
            nowSelectValue: this.properties.range[this.data.nowSlideRank][nowValue[this.data.nowSlideRank]]
          })
          console.log(this.data.nowSelectValue)
        } else {
          console.log('nowSelectValue值为变化')
        }
      }else{
        console.log('nowSlideRank循环前2')
        for(var i in nowValue){
          if(nowValue[i]!=0){
            if (this.data.nowSlideRank != i) {
              this.setData({
                nowSlideRank: i,
              })
              console.log('nowSlideRank赋值')
            }
          }
        }
        if (this.data.nowSelectValue != this.properties.range[this.data.nowSlideRank][nowValue[this.data.nowSlideRank]]) {
          console.log('nowSelectValue值发生变化')
          this.setData({
            nowSelectValue: this.properties.range[this.data.nowSlideRank][nowValue[this.data.nowSlideRank]]
          })
          console.log(this.data.nowSelectValue)
        } else {
          console.log('nowSelectValue值未变化')
        }
      }
      lastValue = event.detail.value
      //console.log(this.data.nowSlideRank)
      var myEventDetail = { 'value': [parseInt(this.data.nowSlideRank),nowValue[this.data.nowSlideRank]]}
      var myEventOption = {}
      this.triggerEvent('change',myEventDetail,myEventOption)
    },

    showMyMultiPicker:function(){
      this.setData({
        isShow:true,
      })
    },


    hideMyMultiPicker:function(){
      console.log('hideMultiPicker')
      this.setData({
        isShow:false,
      })
    }
  },

})