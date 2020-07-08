import axios from 'axios'
import Cookies from 'vue-cookies'
// import Vue from 'vue'

export default { // eslint-disable-next-line no-unused-vars
    namespaced: true,
    state: {
        data: {
            token: "",
            username: "",
            detail: { avatar: "", name: "" },
            submission: [],
            questions: [],
            stats: {
                score: {
                    max: 0,
                    now: 0
                },
                question: {
                    max: 0,
                    now: 0,
                    star: 0
                },
                submission: 0
            },
            doneQuestion: {
                finished: [],
                unfinished: []
            }
        }
    },

    // eslint-disable-next-line no-unused-vars
    getters: {
        getSubmission: state => {
            var data = state.data
            if (data.submission.length) {
                let arr = JSON.parse(JSON.stringify(data.submission))
                for (let i = 0; i < arr.length; i++) {
                    arr[i].i_d = i + 1;
                    var q = data.questions.filter(el => {
                        return el.id == arr[i].questionId
                    }).slice()
                    if (q[0]) {
                        let key = ["title", "rank", "finished", "id"]
                        key.forEach(key => {
                            arr[i][key] = q[0][key]
                        })
                    }
                }
                return arr.slice()
            }
            return []
        },
        getToken: state => {
            return state.data.token
        },
        getUserName: state => {
            return state.data.username
        },
        getNickname: state => {
            return state.data.detail.name
        },
        getDoneQuestion: state => {
            return state.data.doneQuestion
        },
        getQuestions: (state) => {
            return state.data.questions
        },
        getQuestion: (state) => (id) => {
            return state.data.questions.filter(el => el.id == id)[0]
        },
        getLastSubmission: (state) => (id) => {
            var data = state.data
            if (data.submission) {
                for (let i = data.submission.length - 1; i > -1; --i) {

                    if (data.submission[i].questionId == id) {
                        return data.submission[i].result
                    }
                }
                return ""
            } else return ""

        },
        getStats: (state) => {
            return state.data.stats
        }
    },

    // eslint-disable-next-line no-unused-vars
    mutations: {
        setApiToken(state, token) {
            state.data.token = token
        },
        set(state, data) {
            state.data = data
            Cookies.set('expire', Date.now())
        },
        setQuestions(state, data) {
            state.data.questions = data
        },
        setSubmission(state, data) {
            state.data.submission = data
        },
        setDoneQuestion(state, data) {

            state.data.doneQuestion = {
                finished: [],
                unfinished: []
            }
            var sub = JSON.parse(JSON.stringify(data))
            let doneQuestion = state.data.doneQuestion
            sub.forEach(el => {
                if (el.result) {
                    var finished = true
                    for (let i = 0; i < el.result.length; i++) {
                        if (el.result.charAt(i) != 'P') {
                            finished = false
                            if (!doneQuestion.finished.includes(el.questionId) && !doneQuestion.unfinished.includes(el.questionId))
                                doneQuestion.unfinished.push(el.questionId)
                            break
                        }
                    }
                    if (finished) {
                        // remove duplicate
                        let isExisted = doneQuestion.unfinished.indexOf(el.questionId)
                        if (isExisted > -1) {
                            doneQuestion.unfinished.splice(isExisted, 1);
                        }
                        if (!doneQuestion.finished.includes(el.questionId)) {
                            doneQuestion.finished.push(el.questionId)
                        }
                    }

                }
            })
        },
        setStats(state, data) {
            state.data.stats = data
        },
        changeImage(state, url) {
            state.data.detail.avatar = url
        },
        changeName(state, name) {
            state.data.detail.name = name
        },
        clear(state) {
            // clear interval
            for (let i = 0; i < 100; i++) {
                window.clearInterval(i);
                window.clearTimeout(i);
            }
            state.data = {
                token: "",
                username: "",
                detail: { email: "", avatar: "", name: "" },
                submission: [],
                questions: [],
                codeSession: []
            }
            sessionStorage.clear();
        },
    },
    // eslint-disable-next-line no-unused-vars
    actions: {
        async fetch({ state, commit, rootState }) {
            var tok = state.data.token
            await axios.get(rootState.api + "/api/v1/questions").then(res => {

                var allQuestion = JSON.parse(JSON.stringify(res.data.data))
                var _allQuestion = []
                for (var i = 0; i < allQuestion.length; i++) {
                    _allQuestion.push({
                        ...allQuestion[i],
                        i_d: i + 1
                    })
                }
                commit('setQuestions', _allQuestion)
            })
            await axios.post(rootState.api + '/api/v1/list_submission', {
                token: tok
            }).then(response => {
                var submission = response.data.data
                if (!submission) submission = []
                commit('setSubmission', submission)
                commit('setDoneQuestion', submission)
            })
        },
        async isIdExist({ state, commit, rootState }) {
            commit
            let res = false
            await axios.post(rootState.api + '/api/v1/login/', {
                    "username": state.data.username,
                    "password": "testExist"
                }).then(() => {
                    res = true
                })
                .catch((err) => { // if 200 , existed
                    // error 400 
                    res = err.response.data.msg === "password incorrect." ? true : false
                })
            return res
        },
        computeStats({ state, commit }) {
            let q = JSON.parse(JSON.stringify(state.data.questions))
            let s = JSON.parse(JSON.stringify(state.data.doneQuestion))
            let sub = JSON.parse(JSON.stringify(state.data.submission))
            let _q = q.map(el => el.id)
            let _sub = sub.map(el => el.questionId)
            let star = 0
            let score = {
                max: 0,
                now: 0
            }

            s.finished.forEach(el => {
                let ind = _q.indexOf(el)
                if (ind > -1) {
                    star += q[ind].rank

                    if (q[ind].output) {
                        let allCase = q[ind].output.split("$.$")
                        let sc = allCase.length * q[ind].scorePerCase
                        score.max += sc
                        score.now += sc
                    }
                }
            })

            s.unfinished.forEach(el => {

                let ind = _q.indexOf(el)
                    // score
                if (ind > -1) {
                    if (q[ind].output) {
                        let allCase = q[ind].output.split("$.$")
                        score.max += allCase.length * q[ind].scorePerCase
                            // query for best score
                        let arr = _sub.filter(e => e.questionId == el)
                        let max = 0
                        arr.forEach(i => {
                            if (sub[i].score > max) max = sub[i].score
                        })
                        score.now += max
                    }
                }
            })

            star /= 2
            let stat = {
                score: score,
                question: {
                    max: q.length,
                    now: s.finished.length,
                    star: star,
                },
                submission: sub.length
            }
            commit('setStats', stat)
        }
        // autoSave({ state, commit }) {

        // }
    }
}