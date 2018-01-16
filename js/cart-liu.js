/**
 * Created by liuxin on 2017/3/7.
 */
new Vue({
    el:"#app",
    data:{
        productList:[],
        totalMoney: 0,
        checkAllFlag:false,
        delFlag: false,
        curProductIndex:0,
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getData();
        })

    },
    filters:{
        filterMoney: function(value){
            return "￥"+ value.toFixed(2);
        }
    },
    methods:{
        getData:function(){
            var _this = this;
            axios.post("data/cartData.json").then(function(res){
                _this.productList = res.data.result.list;
               // _this.totalMoney = res.data.result.totalMoney; //总金额
            });

        },

        changeQ: function(item,num){
            if(num>0){
                item.productQuentity++;
            }else{
                if(item.productQuentity>1){
                    item.productQuentity--;
                }
            }
            this.calculateMoney();
        },

        selectItem: function(item){
            if(typeof item.checked == 'undefined'){
                //Vue.set(item,"checked",true)  //全局注册
                this.$set(item,"checked",true)  //局部注册
            }else{
                item.checked = !item.checked;
            }

            this.calculateMoney()
        },
        selectAll: function(){
            this.checkAllFlag = !this.checkAllFlag;
            let _this = this;
            _this.productList.forEach(function(item,index){
                if(typeof item.checked == "undefined"){
                    _this.$set(item,"checked",_this.checkAllFlag);
                }else{
                    item.checked = _this.checkAllFlag;
                }
            })
            this.calculateMoney();
        },
        calculateMoney: function(){
            this.totalMoney = 0;
            var _this = this;
            _this.productList.forEach(function(item,index){
                if(item.checked){
                    _this.totalMoney += item.productPrice * item.productQuentity;
                }

            })
            //console.log( _this.totalMoney)
        },
        delConfirm: function(index){
            this.delFlag = true;
            this.curProductIndex = index;
        },
        delItem: function(){
            var index = this.curProductIndex;
            this.productList.splice(index,1);
            this.delFlag = false;
        }
    }
})

//使用全局过滤器的方法
//调用方法    {{product.productPrice * product.productQuentity | money("元")}}
//Vue.filter("money",function(value,type){
//    return "￥"+ value.toFixed(2) + type;
//})