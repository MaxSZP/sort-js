new Vue({
    el: "#app",
    data: {
        array: [],
        sortArray: [],
        count: 0,
        inputText: '',
        selectedSort: '1',
        valid: false,
        options: [
            {text: 'Сортировка пузырьком', value: '1'},
            {text: 'Сортировка выбором', value: '2'},
            {text: 'Гномья сортировка', value: '3'}
        ]
    },
    watch: {
        inputText: function (val) {
            console.log(val);
            var re = /[^0-9,]/;
            if (val.match(re) != null) {
                this.valid = true;
            }
            else {
                this.valid = false;
            }
            if (val.indexOf(',') + 1) {
                if (val.match(re) === null) {
                    this.array = val.split(',');
                }
            }

        }
    },
    methods: {
        sort: function () {
            // this.bubbleSort();
            var tmpArray = this.toInt();
            if(this.selectedSort == 1) {
                this.sortArray = this.bubbleSort(tmpArray);
            }
            else if (this.selectedSort == 2) {
                this.sortArray = this.selectionSort(tmpArray);
            }
            else {
                this.sortArray = this.gnomeSort(tmpArray);
            }

        },

        toInt: function () {
            var tmpArray = [];
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i] != "") {
                    tmpArray[i] = parseInt(this.array[i]);
                }
            }
            return tmpArray;
        },

        bubbleSort: function (array) {
            var n = 0;
            console.log('bubble');

            for (var i = 0, len = array.length - 1; i < len; i++) {
                var swapped = false;
                var j = 0;
                while (j < len - i) {
                    n++;
                    if (array[j] > array[j + 1]) {
                        var c = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = c;
                        swapped = true;
                    }
                    j++;
                }
                if (!swapped) {
                    break;
                }
            }
            this.count = n;
            return array;
        },
        selectionSort: function (array) {
            var n = 0;
            var len = array.length;
            for (var i = 0; i < len - 1; i++) {
                var min = i;
                for (var x = i + 1; x < len; x++) {
                    if (array[x] < array[min]) {
                        min = x;
                    }
                    n++;
                }
                var t = array[min];
                array[min] = array[i];
                array[i] = t;
            }
            this.count = n;
            return array
        },
        gnomeSort: function (ArrayBySort) {
            var count = 0;
            var n = ArrayBySort.length, i = 1, j = 2;
            while (i < n) {
                if (ArrayBySort[i - 1] < ArrayBySort[i]) {
                    i = j;
                    j++;
                }
                else {
                    var t = ArrayBySort[i - 1];
                    ArrayBySort[i - 1] = ArrayBySort[i];
                    ArrayBySort[i] = t;
                    i--;
                    if (i == 0) {
                        i = j;
                        j++;
                    }
                }
                count++;
            }
            this.count = count;
            return ArrayBySort;
        }
    }


});