<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <Header id="score">Current score: {{this.score}}</Header>
            <div class = "content">
                <p id = "question"> Q{{this.number}}: {{this.selectedQuestions[this.counter].question}}</p><br>
                <br>
                {{this.currentpoints}}
                <ul>
                    <li>
                        <div id='help'>
                            <button class='mcq' type='button' id=0 v-on:click='selection(0)'>
                                1. {{this.selectedQuestions[this.counter].options[0]}}
                            </button>
                        </div>
                    </li>
                    <li>
                        <div id='help'>
                            <button class='mcq' type='button' id=1 v-on:click='selection(1)'>
                                2. {{this.selectedQuestions[this.counter].options[1]}}
                            </button>
                        </div>
                    </li>
                    <li v-if='this.selectedQuestions[this.counter].options.length>=3'>
                        <div id='help'>
                            <button class='mcq' type='button' id=2 v-on:click='selection(2)'>
                                3. {{this.selectedQuestions[this.counter].options[2]}}
                            </button>
                        </div>
                    </li>
                    <li v-if='this.selectedQuestions[this.counter].options.length>=4' >
                        <div id='help'>
                            <button class='mcq' type='button' id=3 v-on:click='selection(3)'>
                                4. {{this.selectedQuestions[this.counter].options[3]}}
                            </button>
                        </div>
                    </li>
                </ul>
                <button class = "btn" type='button' v-if="this.show==false" v-on:click="validate();color();">Check Your Answer!</button>
                <button class = "btn" type='button' v-if="this.show==true" v-on:click="validate();next();">Next</button>
                <h1 class="title2">Your current progress: {{this.correctnumber}} questions answered correctly</h1>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Head from './Header.vue'
import Footer from '../Footer.vue'
import db from '../../firebase.js'

export default {
    name: 'question',
    components :{
        Head,
        Footer
    },
    data() {
        return {
            id: this.$route.query.id,
            chose:100, //index of answer selected temporarily
            chosen:100,//index of answer selected permanently
            answer:100, //index of answer
            selectedQuestions:this.$route.query.selectedQuestions,
            score:0,
            correct:false,
            ans: false,
            counter: 0,
            number:this.$route.query.number,
            correctnumber:this.$route.query.correctnumber,
            nooption:false,
            show:false, //boolean to show next button and hide check answer button if true
        }
    },
    methods: {
        toScore: function() {
            this.$router.push({name:'score',query:{id:this.id,score:this.score}})
        },
        next: function() {
            if (this.nooption==true) {
                this.nooption=false
                return
            }
            this.ans=false
            console.log(this.selectedQuestions)
            document.getElementById(this.chosen).style="mcq";
            document.getElementById(this.answer).style="mcq";
             if (this.chosen==this.answer){
                console.log(this.score)
                //this.score+=5
                this.number+=1
                //this.correctnumber+=1
            }else{
                this.number+=1
            }
            this.counter+=1
            this.chosen=100
            this.chose=100
            this.show=false;
            console.log(this.counter)
            if (this.counter==5) {
                this.getscore()
                this.toScore()
            }
        },
        getscore:function(){
            var temp=0 
            var d = new Date()
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
               temp=parseInt(snapshot.data().points)
               temp+= parseInt(this.score)
            }).then(() => {db.firestore().collection('users').doc(this.id).update({
                points:temp,
                date: d.getDate(),
                quizday: d.getDay(),
                month: d.getMonth()
            })})
        },
        selection: function(ans) {
            this.chose = ans;
            this.answer = this.selectedQuestions[this.counter].correct;
        },
        color: function() {
            if (this.nooption==true){
                this.nooption=false
                return
            }
            this.chosen=this.chose
            if (this.answer != this.chosen) {
                document.getElementById(this.chosen).style.background = "red";
                document.getElementById(this.answer).style.background = "green";
                this.ans = true
            } else if (!this.ans) {
                document.getElementById(this.answer).style.background = "green";
                this.ans = true
            }
            this.show=true
            if (this.answer==this.chosen){
                this.score+=5
                this.correctnumber+=1
            }
        },
        validate:function(){
            if (this.chose==100){
                alert('You need to input an option!')
                this.nooption=true;
            }
        },
    },
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    .bg {
        background-color: #9AD5FF;
        padding: 0px;
        margin: 0px;
        width: 100%;
        min-height: 120vh;
    }
    @keyframes zoomIn {
        from {
            transform: translate3d(0,30px,0);
            opacity: 0
        }

        to {
            transform: translate3d(0,0,0);
            opacity: 1
        }
    }
    .mcq:hover {
        background-color:rgb(255, 255, 179);
    }
    .mcq:focus {
        background-color:rgb(255, 255, 179);
    }
    .mcq{
        font-family: Montserrat;
        font-style: normal;
        background-color: #FFFFFF;
        padding:15px;
        border-radius:15px;
        border-width:1px;
        display:flex;
        font-size:25px;
        width:100%;
        cursor: pointer;
    }
    .head {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
    }  
    li{
        list-style-type:none;
        padding:5px;
        margin-left: 40px;
        margin-right:40px;
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 15px;
        margin-left: 10%;
        margin-right: 10%;
        height: 60%;
        width: 80%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px
    }
    #question {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        margin: 10px;
        padding:10px;
        float:left
    }
    #q {
        font-family: Montserrat;
        padding: 8px;
        width: 80%;
        margin: 2%;
        margin-left:8%;
        margin-right:8%;
        font-size: 20px;
        border-radius: 8px;
        border: 10px solid black;
        display: flex;
        align-items: center;
    }
    .btn {
        background: #2D8F8A;
        border:none;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
        width: 30%;
        height: 50px;
        margin: 20px;
        cursor: pointer;
        transition-duration: 0.4s;
    }
    .btn:hover {
        background:#1C746F;
    }
    .title2 {
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        line-height: 58px;
        text-align: center;
        color: #1C746F;
        margin: 15px;
    }
    #score {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        margin: 8px;
        padding-left:600px;
        padding-top:10px;
    }
</style>