/**
     * 这个对象用来承载输入框所需要的验证规则。
     * @type {{executeThat: *, finishThat: *, finish: passwordRule.finish, check: passwordRule.check, execute: passwordRule.execute, checkThat: *}}
     */
    var passwordRule = {
        /**
         * 通过 Check 方法检测后会调用这个方法，这个方法用来处理异步请求验证。
         * @param value
         * @param that
         */
        finish : function (value,that) {
            var me = this
            /**
             * 在准备执行Ajax 请求时，将这个属性设置为 true ， 否则可能导致步骤被多次执行！
             */
            me.isAjax = true
            /**
             * 模拟异步请求验证。
             */
            setTimeout(function () {
                if(value == 456){
                    /**
                     *  执行完Ajax请求后，请将这个属性设置为 false ，
                     */
                    me.isAjax = false
                    /**
                     * 调用这个输入框对象的处理方法。
                     */
                    me.execute(200)
                    return
                }
                me.isAjax = false
                me.execute(0)
            },2000)
        },
        /**
         * 这个对象是 Finish 方法中 that实参引用 ，如果无需用到可以设置为 Null
         */
        finishThat : new Object(),
        /**
         * 此方法为第一个被输入框调用的检测方法 ， 它用于检测数据是否是正确格式，通常同于非异步请求验证
         * @param value
         * @param that
         * @returns {返回给 execute 方法的参数}
         */
        check : function (value,that) {
            if(value == null || value == ""){
                return 101
            }

            if(value == 123456){
                return 100
            }

            /**
             * 我这里返回 1 代表通过了 check 方法的检测 ， 而且如果有存在异步请求验证的情况下 ， 对应的处理方法必须要返回 True 。
             */
            return 1
        },
        /**
         * 这个对象是 check 方法中 that实参引用 ，如果无需用到可以设置为 Null
         */
        checkThat : new Object(),
        /**
         * 输入框处理数据方法。
         * @param code
         * @param that
         * @returns {boolean}
         */
        execute : function (code,that) {
            switch (code) {
                case 100:
                    this.setErrState(true,"location check fill")
                    return false
                case 101:
                    this.setErrState(true,"Value not filled")
                    return false
                case 200:
                    this.setErrState(true,"Ajax check fill")
                    return false
                case 1:
                    return true
                case 0:
                    /**
                     * 调用这个方法来确认输入框数据的数据是合法的。
                     */
                    this.ok()
                    return true
            }
        },
        /**
         * 这个对象是 execute 方法中 that实参引用 ，如果无需用到可以设置为 Null
         */
        executeThat : new Object(),
    }
    var phoneRule = {

        finish : function (value,that) {
        },
        finishThat : new Object(),
        check : function (value,that) {
            if(value != 123456){
                return 100
            }

            /**
             * 没有异步请求验证的情况下 ， 可以直接在这个方法返回对应的处理方式。
             */
            return 0
        },
        checkThat : new Object(),
        execute : function (code,that) {
            switch (code) {
                case 100:
                    this.setErrState(true,"Value format error")
                    return false
                case 0:
                    this.ok()
                    return true
            }
        },
        executeThat : new Object(),
    }
    var array
    function loadTerseInput(elem,rule,id) {
        var mainElem = elem
        var inputElem = mainElem.querySelector(".terseInput_input")
        inputElem.value=""
        var errElem = mainElem.querySelector(".terseInput_icon_err")
        var spanElem = mainElem.querySelector(".terseInput_span")
        var object = new TerseInput(id,mainElem,inputElem,spanElem,errElem,rule.finish,rule.finishThat,rule.check,rule.checkThat,rule.execute)
        object.init()
        return object
    }
    function TerseInput(id,mainElem,inputElem,spanElem,errElem,finishFun,that_ByFinish,checkFun,that_ByCheck,executeFun,that_execute) {
        this.id = id
        this.finishFun = finishFun
        this.checkFun = checkFun
        this.executeFun = executeFun
        this.that_Bycheck = that_ByCheck
        this.that_ByFinish = that_ByFinish
        this.that_ByExecute = that_execute
        this.isOk = false
        this.mainElem = mainElem
        this.inputElem = inputElem
        this.spanElem = spanElem
        this.errElem = errElem
        this.valueEnter = false
        this.isError = false
        this.isAjax = false
        this.state = 0
        this.animationTime = 300
        // 调用这个方法让输入框的数据标识为合法。
        this.ok = function () {
            this.isOk = true
            this.valueEnter = true
            this.mainElem.setAttribute("ok","true")
        }
        // 调用这个方法让输入框的数据标识为非法。
        this.beNot = function () {
            this.isOk = false
            this.valueEnter = false
            this.mainElem.setAttribute("ok","false")
        }
        this.check = function () {
            var array = [this.getValue(),this.that_Bycheck]
            var code = this.checkFun.apply(this,array)
            return this.execute(code)
        }
        // 调用这个方法让输入框获取焦点
        this.focus = function () {
            this.inputElem.focus()
        }
        /**
         * 调用这个方法让设置输入框的错误状态
          * @param bool
         * @param msg 如果此参数不为空 ，则显示详细的错误信息。
         */
        this.setErrState = function (bool,msg) {
            if(bool){
                if(this.state != 1){
                    this.setState(2)
                }
                this.setDescColor(2)
                if(msg!= null){
                    this.showErrInfo(msg)
                }
                this.isError = true
            }else{
                if(this.state != 1){
                    this.setState(0)
                }
                this.setDescColor(0)
                this.hideErrInfo()
                this.isError = false
            }
        }
        // 设置错误信息
        this.showErrInfo = function (str) {
            this.errElem.innerText = str
            this.errElem.setAttribute("title",str)
            this.errElem.style.display = "inline-block"
        }
        // 隐藏错误信息
        this.hideErrInfo = function () {
            this.errElem.innerText = ""
            this.errElem.setAttribute("title","")
            this.errElem.style.display = "none"
        }
        this.animationToUp  = function () {
            this.spanElem.classList.add("terseInput_span_animat_up")
            var that = this.spanElem
            setTimeout(function () {
                that.classList.remove("terseInput_span_state_down")
                that.classList.add("terseInput_span_state_up")
                that.classList.remove("terseInput_span_animat_up")
            },this.animationTime)
        }
        this.animationToDown = function () {
            this.spanElem.classList.add("terseInput_span_animat_down")
            var that = this.spanElem
            setTimeout(function () {
                that.classList.remove("terseInput_span_state_up")
                that.classList.add("terseInput_span_state_down")
                that.classList.remove("terseInput_span_animat_down")
            },this.animationTime)
        }
        // 设置输入框的状态
        this.setState = function (code) {
            switch (code) {
                case 0:
                    this.mainElem.classList.remove("terseInput_state_err")
                    this.mainElem.classList.remove("terseInput_state_action")
                    this.mainElem.setAttribute("state","normal")
                    this.state = 0
                    break
                case 1:
                    this.mainElem.classList.remove("terseInput_state_err")
                    this.mainElem.classList.add("terseInput_state_action")
                    this.mainElem.setAttribute("state","action")
                    this.state = 1
                    break
                case 2:
                    this.mainElem.classList.remove("terseInput_state_action")
                    this.mainElem.classList.add("terseInput_state_err")
                    this.mainElem.setAttribute("state","err")
                    this.state = 2
                    break

                default:
                    return
            }

            return code;
        }
        // 设置描述的颜色
        this.setDescColor = function (code) {
            if(this.spanElem.style.color == ""){
                this.spanElem.setAttribute("style","color: gray")
            }

            switch (code) {
                case 0:
                    this.spanElem.style.color = "#808080"
                    break
                case 1:
                    this.spanElem.style.color = "#000000"
                    break
                case 2:
                    this.spanElem.style.color = "#ff041a"
                    break
            }
        }
        // 设置描述内容
        this.setDescStr = function (str) {
            this.spanElem.value = str
        }
        // 是否有值
        this.isValue = function () {
            return this.inputElem.value.length > 0 ? true : false
        }
        // 获取值
        this.getValue = function () {
            if(this.isValue == false){
                return null
            }
            return this.inputElem.value
        }
        // 清除值
        this.clearValue = function () {
            this.inputElem.value = ""
        }
        this.execute = function (code) {
            var array = [code,this.that_ByExecute]
            return this.executeFun.apply(this,array)
        }
        this.bindEventByMainElemToClick = function () {
            var that = this
            this.mainElem.onclick = function (event) {
                that.eventByMainElemToClick(event,that)
            }
        }
        this.bindEventByMainElemToMousedown = function () {
            var that = this
            this.mainElem.onmousedown = function (event) {
                that.eventByMainElemToMousedown(event,that)
            }
        }
        this.bindEventByInputElemToFocus = function () {
            var that = this
            this.inputElem.onfocus = function (event) {
                that.eventByInputToFocus(event,that)
            }
        }
        this.bindEventByInputElemToBlur = function () {
            var that = this
            this.inputElem.onblur = function (event) {
                that.eventByInputToBlur(event,that)
            }
        }
        this.bindEventByInputElemToInput = function () {
            var that = this
            this.inputElem.oninput = function (event) {
                that.eventByInputToInput(event,that)
            }
        }
        this.eventByInputToFocus = function (event,that) {
            that.setState(1)

            {
                if(that.isValue() == true){
                    return
                }
            }
            that.animationToUp()
        }
        this.eventByMainElemToClick = function (event,that) {
            that.inputElem.focus()
        }
        this.eventByInputToBlur = function (event,that) {
            if(that.isError == true){
                that.setState(2)
                if(that.isValue() == false){
                    that.animationToDown()
                }
                return
            }
            {
                that.setState(0)
            }
            if(that.isValue() == false){
                that.animationToDown()
                return
            }
            that.enter()
        }
        this.enter = function () {
            if(!this.check()){
                return
            }
            if(this.isOk == false){
                this.finish()
            }
        }
        this.finish = function () {
            var array = [this.getValue(),this.that_ByFinish]
            this.finishFun.apply(this,array)
        }
        this.eventByInputToInput = function (event,that) {
            if(that.isError == true){
                that.setErrState(false)
            }
            that.beNot()
        }
        this.eventByMainElemToMousedown = function (event,that) {
            if((that.mainElem == event.target) || (event.target.parentElement == that.mainElem)){
                event.preventDefault()
                return false
            }
        }
        this.init = function () {
            this.bindEventByInputElemToFocus()
            this.bindEventByMainElemToClick()
            this.bindEventByInputElemToBlur()
            this.bindEventByInputElemToInput()
            this.bindEventByMainElemToMousedown()
        }
    }
    function click (){
        var value = true
        {

            for (let i = 0; i < array.length; i++) {
                if(array[i].isOk == false ){
                    if(array[i].isError == false && array[i].isAjax == false){
                        array[i].enter()
                    }

                    value = false
                }
            }
        }

        if(value){
            alert("成功")
        }else{
            {
                /**
                 * 处于错误状态的输入框优先获取焦点
                 */
                for (let i = 0; i < array.length; i++) {
                    if(array[i].isError == true){
                        array[i].focus()
                        return
                    }
                }
                for (let i = 0; i < array.length; i++) {
                    if(array[i].isOk == false){
                        array[i].focus()
                        return;
                    }
                }
            }
        }


    }
    window.onload = function () {
        var  password = loadTerseInput(document.getElementById("password"),passwordRule,"password")
        var  user = loadTerseInput(document.getElementById("username"),phoneRule,"password")
        array = [password,user]
        document.getElementById("but").onclick = function () {
            click()
        }
    }