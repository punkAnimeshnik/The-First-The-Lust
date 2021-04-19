import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        loader: false,
        eye: {
            value: "",
            active:false
        },
        heigt: {
            name: "heigt",
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
        peopleClone: []

    },

    methods:{

        switchActive: (sel) =>{
            const _this = app;

             ( sel === "age") ?  (_this.age.active = !_this.age.active, _this.heigt.active = false, _this.eye.active = false, _this.sort.active = false) :
             ( sel === "heigt") ?  (_this.heigt.active = !_this.heigt.active, _this.age.active = false, _this.eye.active = false, _this.sort.active = false) :
             ( sel === "eye") ?  (_this.eye.active = !_this.eye.active, _this.age.active = false, _this.heigt.active = false, _this.sort.active = false) :
             ( sel === "sort") ? (_this.sort.active = !_this.sort.active, _this.age.active = false, _this.eye.active = false, _this.heigt.active = false):
             (_this.sort.active = false, _this.age.active = false, _this.eye.active = false, _this.heigt.active = false)



        },
         setLeftValue: (id) => {
             let inputLeft = document.getElementById(id+"-input-left")
             let inputRight = document.getElementById(id+"-input-right")
             let thumbLeft = document.querySelector(".slider."+id+" > .thumb.left")
             let range = document.querySelector(".slider."+id+" > .range")
    let _this = inputLeft;
     let min = parseInt(_this.min),
        max = parseInt(_this.max);

    _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

    let percent = ((_this.value - min) / (max - min)) * 100;

    thumbLeft.style.left = percent + "%";
    range.style.left = percent + "%";
},
        setRightValue: (id) => {
            let inputLeft = document.getElementById(id+"-input-left")
            let inputRight = document.getElementById(id+"-input-right")
            let thumbRight = document.querySelector(".slider."+id+" > .thumb.right")
            let range = document.querySelector(".slider."+id+" > .range")

        let _this = inputRight;
        let min = parseInt(_this.min),
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
                    arrew[i].img ='../src/img/foto/'+ arrew[i].name + '.png'
                }
                else if (i == 7){
                    arrew[i].img ='../src/img/foto/'+ arrew[i].name + '.jpeg'
                }
                else{
                    arrew[i].img ='../src/img/foto/'+ arrew[i].name + '.jpg'
                }

            }

            return arrew;
        },
        filtEye: (e)=>{
           const _this = app;
           _this.loader=true
           let masive = [];
            _this.peoples = [..._this.peopleClone]
            if (e.tagName !== 'DIV'){
                let a = 0;
                for (const item in _this.peoples) {
                    if(_this.peoples[item].eye_color !== e.className){
                        masive.push(item)
                    }
                }
                //_this.peoples.splice([...masive],1)
                for (let item of masive) {
                    _this.peoples.splice(item-a,1)
                    a++
                }

            }
           setTimeout(()=>{
               _this.loader=false
           }, 500)

        },
        filtHeigt: ()=>{
                const _this = app;
                let masive = [];
                _this.peoples = [..._this.peopleClone]
                let a = 0;
                for (const item in _this.peoples) {

                    if(_this.peoples[item].height < _this.heigt.min || _this.peoples[item].height > _this.heigt.max ){
                        masive.push(item)
                    }
                }
                for (let item of masive) {
                    _this.peoples.splice(item-a,1)
                    a++
                }

                console.log(masive)


        },
        filtAge: ()=>{
                const _this = app;
                let masive = [];
                _this.peoples = [..._this.peopleClone]
                let a = 0;
                for (const item in _this.peoples) {

                    if(parseInt( _this.peoples[item].birth_year)< parseInt(_this.age.min+"BBY") || parseInt( _this.peoples[item].birth_year) > parseInt(_this.age.max+"BBY") ){
                        masive.push(item)
                    }
                }
                for (let item of masive) {
                    _this.peoples.splice(item-a,1)
                    a++
                }
        },
        filtBy: (e)=>{

            const _this = app;
            _this.loader=true
            _this.peoples = [..._this.peopleClone]
            if (e.tagName !== 'DIV'){
                if (e.className === "age"){
                    for (const i in _this.peoples) {
                        for (const j in _this.peoples) {
                            if (parseInt( _this.peoples[i].birth_year) >= parseInt(_this.peoples[j].birth_year)){
                                let a = _this.peoples[i];
                                _this.peoples[i] = _this.peoples[j]
                                _this.peoples[j] = a
                            }
                        }
                    }
                }
                else if (e.className === "mass"){
                    for (const i in _this.peoples) {
                        for (const j in _this.peoples) {
                            if (parseInt( _this.peoples[i].mass) >= parseInt(_this.peoples[j].mass)){
                                let a = _this.peoples[i];
                                _this.peoples[i] = _this.peoples[j]
                                _this.peoples[j] = a
                            }
                        }
                    }
                }
                else {
                    for (const i in _this.peoples) {
                        for (const j in _this.peoples) {
                            if (parseInt( _this.peoples[i].height) >= parseInt(_this.peoples[j].height)){
                                let a = _this.peoples[i];
                                _this.peoples[i] = _this.peoples[j]
                                _this.peoples[j] = a
                            }
                        }
                    }
                }


            }
            setTimeout(()=>{
                _this.loader=false
            }, 500)

        }

    },
    created: function () {
        fetch('http://swapi.dev/api/people')
            .then((response) => { return response.json() })
            .then((data) => { this.peoples = [...data.results];
                this.imgCreat(this.peoples);
               this.peopleClone = [...this.peoples]
            })

        setTimeout(()=>{
            this.setLeftValue('heigt')
            this.setRightValue('heigt')
        }, 10)
        setTimeout(()=>{
            this.setLeftValue('age')
            this.setRightValue('age')
        }, 10)




    }

})