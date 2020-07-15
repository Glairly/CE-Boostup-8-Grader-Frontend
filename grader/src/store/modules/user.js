import axios from "axios";
import Cookies from "vue-cookies";
// import Vue from 'vue'

export default {
    // eslint-disable-next-line no-unused-vars
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
                    now: 0,
                },
                question: {
                    max: 0,
                    now: 0,
                    star: 0,
                },
                submission: 0,
            },
            doneQuestion: {
                finished: [],
                unfinished: [],
            },
        },
        options: {
            darkMode: false,
            search: {
                mode: false,
                search: "",
                types: [],
                filter: {
                    typeSingle: false,
                    onlyPassed: false,
                    onlyNotPassed: false,
                    onlyIdle: false
                },
                rank_range: [0, 10],
                sortDescTask: false,
                sortDescSubmit: true,
                itemsPerPage: 20,
                pageTask: 1,
                pageSubmit: 1,
            }
        },
        fetch: {
            Submissions: {
                interval: 0,
                id: 0,
            },
            Questions: {
                interval: 0,
                id: 0,
            },
        },
    },

    // eslint-disable-next-line no-unused-vars
    getters: {
        getSubmission: (state) => {
            var data = state.data;
            if (data.submission.length) {
                let arr = JSON.parse(JSON.stringify(data.submission));
                for (let i = 0; i < arr.length; i++) {
                    arr[i].i_d = i + 1;
                    var q = data.questions
                        .filter((el) => {
                            return el.id == arr[i].questionId;
                        })
                        .slice();
                    if (q[0]) {
                        let key = ["title", "rank", "finished", "id"];
                        key.forEach((key) => {
                            arr[i][key] = q[0][key];
                        });
                    }
                }
                return arr.slice();
            }
            return [];
        },
        getToken: (state) => {
            return state.data.token;
        },
        getUserName: (state) => {
            return state.data.username;
        },
        getNickname: (state) => {
            return state.data.detail.name;
        },
        getDoneQuestion: (state) => {
            return state.data.doneQuestion;
        },
        getQuestions: (state) => {
            return state.data.questions;
        },
        getQuestion: (state) => (id) => {
            return state.data.questions.filter((el) => el.id == id)[0];
        },
        getLastSubmission: (state) => (id) => {
            var data = state.data;
            if (data.submission) {
                for (let i = data.submission.length - 1; i > -1; --i) {
                    if (data.submission[i].questionId == id) {
                        return data.submission[i].result;
                    }
                }
                return "";
            } else return "";
        },
        getStats: (state) => {
            return state.data.stats;
        },
        getSearchOptions: (state) => {
            return state.options.search;
        }
    },

    // eslint-disable-next-line no-unused-vars
    mutations: {
        setApiToken(state, token) {
            state.data.token = token;
        },
        set(state, data) {
            state.data = data;
            Cookies.set("expire", Date.now());
        },
        setQuestions(state, data) {
            state.data.questions = data;
        },
        setSubmission(state, data) {
            state.data.submission = data;
        },
        setDoneQuestion(state, data) {
            state.data.doneQuestion = {
                finished: [],
                unfinished: [],
            };
            var sub = JSON.parse(JSON.stringify(data));
            let doneQuestion = state.data.doneQuestion;
            sub.forEach((el) => {
                if (el.result) {
                    if (doneQuestion.finished.includes(el.questionId)) {
                        return;
                    }
                    if (/^P*$/.test(el.result)) { // check all char is P
                        // remove duplicate
                        let isExisted = doneQuestion.unfinished.indexOf(el.questionId);
                        if (isExisted > -1) {
                            doneQuestion.unfinished.splice(isExisted, 1);
                        }
                        doneQuestion.finished.push(el.questionId);
                    } else {
                        if (!doneQuestion.unfinished.includes(el.questionId))
                            doneQuestion.unfinished.push(el.questionId);
                    }
                }
            });
        },
        setStats(state, data) {
            state.data.stats = data;
        },
        changeImage(state, url) {
            state.data.detail.avatar = url;
        },
        changeName(state, name) {
            state.data.detail.name = name;
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
                codeSession: [],
            };
            sessionStorage.clear();
        },
        resetSearch(state) {
            state.options.search = {
                mode: false,
                search: "",
                types: [],
                filter: {
                    typeSingle: false,
                    onlyPassed: false,
                    onlyNotPassed: false,
                    onlyIdle: false
                },
                rank_range: [0, 10],
                sortDescTask: false,
                sortDescSubmit: true,
                itemsPerPage: 20,
                pageTask: 1,
                pageSubmit: 1,
            }
        },
    },
    // eslint-disable-next-line no-unused-vars
    actions: {
        async fetchQuestions({ commit, rootState }) {
            await axios.get(rootState.api + "/api/v1/questions").then((res) => {
                var allQuestion = JSON.parse(JSON.stringify(res.data.data));
                var _allQuestion = [];
                for (var i = 0; i < allQuestion.length; i++) {
                    _allQuestion.push({
                        ...allQuestion[i],
                        i_d: i + 1,
                    });
                }
                commit("setQuestions", _allQuestion);
            });
        },
        async fetchSubmissions({ state, commit, rootState }) {
            await axios
                .post(rootState.api + "/api/v1/list_submission", {
                    token: state.data.token,
                })
                .then((response) => {
                    var submission = response.data.data;
                    if (!submission) submission = [];
                    if (state.data.submission.length != submission.length) {
                        commit("setSubmission", submission);
                        commit("setDoneQuestion", submission);
                    }
                });
        },
        async fetch({ dispatch }) {
            dispatch('fetchQuestions');
            dispatch('fetchSubmissions');
        },
        async isIdExist({ state, commit, rootState }) {
            commit;
            let res = false;
            await axios
                .post(rootState.api + "/api/v1/login/", {
                    username: state.data.username,
                    password: "testExist",
                })
                .then(() => {
                    res = true;
                })
                .catch((err) => {
                    // if 200 , existed
                    // error 400
                    res = err.response.data.msg === "password incorrect." ? true : false;
                });
            return res;
        },
        computeStats({ state, commit }) {
            let q = JSON.parse(JSON.stringify(state.data.questions));
            let s = JSON.parse(JSON.stringify(state.data.doneQuestion));
            let sub = JSON.parse(JSON.stringify(state.data.submission));
            let _q = q.map((el) => el.id);
            let _sub = sub.map((el) => el.questionId);
            let star = 0;
            let score = {
                max: 0,
                now: 0,
            };

            s.finished.forEach((el) => {
                let ind = _q.indexOf(el);
                if (ind > -1) {
                    star += q[ind].rank;
                    if (!process.env.NODE_ENV == "development") {
                        let indS = _sub.indexOf(el);
                        if (sub[indS].maxScore) {
                            score.max += sub[indS].maxScore;
                            score.now += sub[indS].maxScore;
                        }
                    }
                }
            });

            s.unfinished.forEach((el) => {
                let arr = []
                for (let i = 0; i < _sub.length; ++i) {
                    if (_sub[i] == el) {
                        arr.push(i)
                    }
                }
                let max = 0;
                if (arr.length)
                    arr.forEach((i) => {
                        if (sub[i].score > max) max = sub[i].score;
                    });
                score.max += max;
                score.now += max;
            });

            star /= 2;
            // if (process.env.NODE_ENV == "development") {
            //     score.max = 1000;
            // }
            let stat = {
                score: score,
                question: {
                    max: q.length,
                    now: s.finished.length,
                    star: star,
                },
                submission: sub.length,
            };
            commit("setStats", stat);
        },
        // autoSave({ state, commit }) {

        // },
        setFetchInterval({ state, dispatch }, payload) {
            if (!state.fetch[payload.item]) return;
            if (payload.val == 0) {
                clearInterval(state.fetch[payload.item].id);
                state.fetch[payload.item].interval = 0;
                state.fetch[payload.item].id = 0;
            } else if (state.fetch[payload.item].interval != payload.val) {
                clearInterval(state.fetch[payload.item].id);
                state.fetch[payload.item].interval = payload.val;

                let pro = Promise.resolve(0);
                
                if (typeof payload.force === 'undefined' || payload.force !== false) {
                    pro = dispatch('fetch' + payload.item);
                }

                pro.then(() => {
                    state.fetch[payload.item].id = setInterval(() => {
                        dispatch('fetch' + payload.item);
                    }, payload.val);
                })
            }
        },
    },
};