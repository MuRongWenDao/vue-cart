var vm = new Vue({
	el: ".container",
	data: {
		limitNum:3,
		addressIndex: 0,
		addressList: [],
		isNextFlag: false,
		loadMoreFlag: false,
		shippingMethod:1,
		showModal:false,
		delItem:""
	},
	mounted: function () {
		this.$nextTick(function () {
			this.loadingState = true;
			this.queryAddress();
		});
	},
	computed: {
		filteAddress:function (){
			return this.addressList.slice(0,this.limitNum)
		}
	},
	methods: {
		queryAddress: function () {
			var _this = this;
			let a= 3;
			this.$http.get("data/address.json").then(function (response) {
				var res = response.data;
				if(res.status=="0"){
					_this.addressList = res.result;
				}
			})
		},
		loadMoreData: function() {
			this.loadMoreFlag = !this.loadMoreFlag;
			if (this.loadMoreFlag) {
				this.limitNum = this.addressList.length;
			} else {
				this.limitNum = 3;
			}
		},
		setDefaultAddress: function(addrId) {
			var _this = this;
			_this.addressList.forEach(function (item) {

				if(item.addressId==addrId){
					item.isDefault = true;
				}else{
					item.isDefault = false;
				}
				console.log(item.addressId+"::"+item.isDefault);
			});
		},
		delConfirm: function(k) {
			var _this = this;
			_this.showModal = true;
			_this.delItem = k;
		},
		delUserAddress: function() {
			var _this = this;
			_this.showModal = false;
			var index = _this.addressList.indexOf(_this.delItem);
			console.log(index)
			_this.addressList.splice(index,1);
			//_this.confirmModalFlag = false;
			//_this.addressList.$remove(h.delItem);
		}
	}
});