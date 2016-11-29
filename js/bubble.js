
var vm = new Vue({
    el: '#app',
    data: {
        items: [],
        step: 15,
        animationSpeed: 2000,
        maxAnimationSpeed: 5000,
        tmp: {},
        i: 0,
        arr: [4, 5, 2, 10, 5]
    },
    created: function () {
        this.generateArray();
        //  console.log(this.items);
    },
    filters: {
        toSecond: function (value) {
            return value/1000 + ' c.'
        }
    },
    methods: {
        generateArray: function () {
            for (var i = 0; i < 10; i++) {
                this.items.push({
                    id: i,
                    height: 50 + this.step + 'px',
                    active: false
                });
                this.step = this.step + 15;
            }
        },
        randomIndex: function () {
            return Math.floor(Math.random() * this.items.length)
        },
        add: function (i, obj) {
            console.log(obj);
            this.items.splice(i, 0, obj)
        },
        remove: function (i) {
            this.items.splice(i, 1)
        },
        shuffle: function () {
            this.items = _.shuffle(this.items)
        },
        sort: function () {
            console.log(this.i);
            /* var j = 0;
             if (this.i < 5) {
             this.i++;
             console.log(this.items.length);
             /!* setTimeout(function () {
             sort();
             }, 2000);*!/
             }
             else {
             console.log('end');
             }*/


            /*
             * for(j=1;j<ar.length-1;j++){
             coun++;
             for(i=1;i<ar.length;i++){
             if(ar[i]<ar[i-1]){
             temp = ar[i];
             ar[i] = ar[i-1];
             ar[i-1] = temp;
             coun++;
             }
             else coun++;
             }
             }*/
        },
        animationSort: function () {
            var j = 1;
            var timer = setTimeout(function g() {
                var i = 1;
                var timerId = setTimeout(function go() {
                    console.log(vm.items.length);
                    vm.items[i-1].active = false;
                    if (i >= 2) {
                        vm.items[i - 2].active = false;
                    }

                    vm.items[i].active = true;
                    vm.items[i - 1].active = true;
                    if (vm.items[i].id < vm.items[i - 1].id) {
                        //console.log(i);
                            var tmp = vm.items[i - 1];
                            console.log(tmp);
                            vm.remove(i - 1);
                            vm.add(i, tmp);
                        /* temp = vm.items[i];
                         vm.items[i] = vm.items[i - 1];
                         vm.items[i - 1] = temp;*/
                    }

                    if (i < vm.items.length) setTimeout(go, vm.animationSpeed);
                    i++;
                }, 100);
                if (j < vm.items.length - 1) setTimeout(g, vm.animationSpeed * vm.items.length);
                j++;
            }, 100);

            var r = setTimeout(function tr() {
                console.log(vm.items);
            }, 42000);

        }
    }
});