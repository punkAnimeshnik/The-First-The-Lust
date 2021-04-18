import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        eye: {
            value: "",
            active:false
        },
        heigt: {
            min:96,
            max: 202,
            active:false
        },
        age: {
            min: 12,
            max: 112,
            active:false
        },
        sort: {
            value: "",
            active:false
        },
        peoples: [],

    },

    methods:{
        switchActive: (sel) =>{
            const _this = app;

             ( sel === "age") ?  (_this.age.active = !_this.age.active, _this.heigt.active = false, _this.eye.active = false, _this.sort.active = false) :
             ( sel === "heigt") ?  (_this.heigt.active = !_this.heigt.active, _this.age.active = false, _this.eye.active = false, _this.sort.active = false) :
             ( sel === "eye") ?  (_this.eye.active = !_this.eye.active, _this.age.active = false, _this.heigt.active = false, _this.sort.active = false) :
             (_this.sort.active = !_this.sort.active, _this.age.active = false, _this.eye.active = false, _this.heigt.active = false)



        },
         setLeftValue: () => {
             let inputLeft = document.getElementById("input-left")
             let inputRight = document.getElementById("input-right")
             let thumbLeft = document.querySelector(".slider > .thumb.left")
             let range = document.querySelector(".slider > .range")
    let _this = inputLeft,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

    _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

    let percent = ((_this.value - min) / (max - min)) * 100;

    thumbLeft.style.left = percent + "%";
    range.style.left = percent + "%";
},
        setRightValue: () => {
            let inputLeft = document.getElementById("input-left")
            let inputRight = document.getElementById("input-right")
            let thumbRight = document.querySelector(".slider > .thumb.right")
            let range = document.querySelector(".slider > .range")

        let _this = inputRight,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

    _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

    let percent = ((_this.value - min) / (max - min)) * 100;


    thumbRight.style.right = (100 - percent) + "%";
    range.style.right = (100 - percent) + "%";
},
        imgCreat: (arrews) =>{
           let arrew = [...arrews]
            let n=10;
            let i;
            for (i=0;i<n;i++) {
                if (i == 1) {
                    arrew[i].img ='src/img/foto/'+ arrew[i].name + '.png'
                }
                else if (i == 7){
                    arrew[i].img ='src/img/foto/'+ arrew[i].name + '.jpeg'
                }
                else{
                    arrew[i].img ='src/img/foto/'+ arrew[i].name + '.jpg'
                }

            }

            return arrew;
        }
    },
    created: function () {
        fetch('http://swapi.dev/api/people')
            .then((response) => { return response.json() })
            .then((data) => { this.peoples = [...data.results];
                this.imgCreat(this.peoples);
                console.log(this.peoples)
            })

        setTimeout(()=>{
            this.setLeftValue()
            this.setRightValue()
        }, 1)



    }

})