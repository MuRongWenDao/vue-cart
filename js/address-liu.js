new Vue({
    el:"#container",
    data:{
        addressList:[],
        curIndex:'0',
        showNum:3,

    },
    mounted:function(){
        this.$nextTick(function(){
            this.getData();
        })
    },
    computed : {
        filteredAddress: function(){
            return this.addressList.slice(0,this.showNum);
        }
    },

    methods:{
        getData:function(){
            var _this = this;
            axios.post("data/address.json").then(function(res){
                _this.addressList = res.data.result;
            });
        },
        showMore: function(){
            this.showNum = this.addressList.length;
            console.log(this.showNum)
        },
  /*      selectAddress:function(address){
            var _this = this;
            this.addressList.forEach(function(item,index){
                //item.isDefault = false;
                if(typeof item.isCheck == 'undefined'){
                    _this.$set(item,"isCheck",false);
                }else{
                    item.isCheck = false;
                }
            });
            address.isCheck = true;
            if(address.isDefault){

            }

        },*/
        setDefault: function(addressId){
            this.addressList.forEach(function(item,index){
                if(item.addressId == addressId){
                    item.isDefault = true;
                }else{
                    item.isDefault = false;
                }

            });

        }

    }
})