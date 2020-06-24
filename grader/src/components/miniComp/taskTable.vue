<template>
<VueGlow :color="color" mode="hex" style="width:100%" elevation="15" intense>
    <v-card class="">
        <v-data-iterator :items="filtered" :custom-filter="customFilter" :items-per-page.sync="itemsPerPage" :page="page" :search="search" :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer>
            <!-- search bar etc. -->
            <template v-slot:header>
                <v-toolbar class="mb-2 rounded-b-xl rounded-t-m" :color="color" rounded flat>
                    <!-- title -->
                    <!-- <v-toolbar-title  class="headline font-weight-black mr-5">{{title}}</v-toolbar-title> -->
                    <!-- change table -->
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-switch color="white" v-on="on" hide-details v-model="mode"></v-switch>
                        </template>
                        <span>Switch Table Style</span>
                    </v-tooltip>

                    <v-divider vertical class="mx-3"></v-divider>
                    <!-- Search Bar -->
                    <v-col cols="3">
                        <v-text-field v-model="search" clearable solo hide-details prepend-inner-icon="search" label="Search Name"></v-text-field>
                    </v-col>
                    <v-divider vertical class="mx-1"></v-divider>
                    <!-- types -->
                    <template v-if="type != 'submission'">
                        <v-col cols="3">
                            <v-select multiple chips :menu-props="{ bottom: true, offsetY: true }" v-model="types" :items="table.types" clearable solo hide-details prepend-inner-icon="tag" label="types">
                                <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0">
                                        <span>{{ item }}</span>
                                    </v-chip>
                                    <span v-if="index === 1" class="grey--text caption">(+{{ types.length - 1 }} others)</span>
                                </template>
                            </v-select>
                        </v-col>
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-checkbox v-on="on" v-model="filter.typeSingle" color="light" label="single" hide-details></v-checkbox>
                                </template>
                                <span>Switch Filter to "Contain Only" mode</span>
                            </v-tooltip>
                        </v-col>
                        <v-divider vertical class="mx-3"></v-divider>
                    </template>
                    <template v-else>
                        <v-col cols="4">
                            <v-tooltip left>
                                <template v-slot:activator="{ on }">
                                    <v-checkbox v-on="on" v-model="filter.onlyPassed" color="white" label="Only Passed" hide-details></v-checkbox>
                                </template>
                                <span>Show only Passed Submission</span>
                            </v-tooltip>
                        </v-col>
                    </template>

                    <template v-if="$vuetify.breakpoint.mdAndUp">
                        <v-row justify="start" align="center">
                            <!-- Diff filter -->
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-col cols="6" v-on="on">
                                        <v-range-slider hide-details label="rank" v-model="rank_range" track-color="black" color="white" thumb-color="black" thumb-label="always" min="0" max="10"></v-range-slider>
                                    </v-col>
                                </template>
                                <span>Rank Range</span>
                            </v-tooltip>
                            <v-spacer></v-spacer>
                            <!-- sort desc or asc -->
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-col v-on="on" class="d-none d-md-flex d-xl-none d-md-none d-lg-flex">
                                        <v-btn-toggle v-model="sortDesc" mandatory>
                                            <v-btn large depressed :value="false">
                                                <v-icon>mdi-arrow-up</v-icon>
                                            </v-btn>
                                            <v-btn large depressed :value="true">
                                                <v-icon>mdi-arrow-down</v-icon>
                                            </v-btn>
                                        </v-btn-toggle>
                                    </v-col>
                                </template>
                                <span>Sort Style</span>
                            </v-tooltip>
                            <v-spacer></v-spacer>
                        </v-row>
                    </template>
                </v-toolbar>
            </template>
            <!--  -->
            <!-- table data -->
            <template v-if="!mode" v-slot:default="props">
                <v-row class="pa-5">
                    <v-col v-for="(item,index) in props.items" :key="index" cols="12" sm="6" md="4" lg="3">
                        <v-hover v-slot:default="{ hover }" close-delay="50">

                            <v-card class="rounded-xl" :color="item.userPassed ? 'light-green lighten-5': 'light'" light :class="animation" v-ripple :elevation="hover ? 16 : 2">
                                <v-fade-transition>
                                    <v-overlay v-if="hover" absolute color="grey lighten-5">
                                        <v-btn @click.end="toCoding(item,index)">Go to Coding</v-btn>
                                    </v-overlay>
                                </v-fade-transition>

                                <!-- <v-fade-transition>
                                    <v-overlay absolute color="success lighten-5">
                                        <v-btn @click.end="toCoding(item)">Finished</v-btn>
                                    </v-overlay>
                                </v-fade-transition> -->

                                <v-row align="center" justify="center" :style="{ 'background' : ccolor}" style="color:black" class="ma-0 pa-0 rounded-t-xl subheading glow-2 font-weight-bold">
                                    <v-col cols="3">
                                        {{ item.i_d }}
                                    </v-col>

                                    <v-col> {{ item.title }} </v-col>
                                </v-row>

                                <v-divider :color="item.status_col"></v-divider>
                                <v-row class="ma-0 pa-0" align="center" justify="center">
                                    <v-col cols="3">
                                        Rank
                                    </v-col>
                                    <v-divider vertical> </v-divider>
                                    <v-col>
                                        <v-rating background-color="grey lighten-1" :full-icon="item.rank/2 >= 5 ? ratingIcon.full : ratingIcon.default" :half-icon="ratingIcon.half" :value="item.rank/2" style="flex: none;" :color="ratingCol(item.rank)" dense half-increments readonly size="20"></v-rating>
                                    </v-col>
                                </v-row>

                                <v-row v-if="item.finished || item.finished == 0" class="ma-0 pa-0" align="center" justify="center">
                                    <v-col cols="3">
                                        Passed
                                    </v-col>
                                    <v-divider vertical> </v-divider>
                                    <v-col>
                                        {{ item.finished  }}
                                    </v-col>
                                </v-row>
                                <!-- <v-list dense>
                                    <v-list-item>
                                        <v-list-item-content>Author</v-list-item-content>
                                        <v-list-item-content class="align-end">{{ item.by }}</v-list-item-content>
                                    </v-list-item>
                                </v-list> -->
                                <!-- <v-divider :color="item.status_col"></v-divider> -->

                                <v-row class="ma-0 pa-0" align="center" justify="center" v-if="item.result">
                                    <v-col cols="3">Result</v-col>
                                    <!-- <v-list-item-content class="align-end" :style="{color:item.status_col}">{{ item.list }}</v-list-item-content> -->
                                    <v-divider vertical> </v-divider>

                                    <v-col>{{ item.result }}</v-col>

                                </v-row>

                                <v-row class="ma-0 pa-0" v-if="item.types" align="center" justify="center">
                                    <v-col cols="3">
                                        Tags
                                    </v-col>
                                    <v-divider vertical> </v-divider>
                                    <v-col class="ma-0 pa-1">
                                        <v-row class="mx-5 pa-0" justify="start">
                                            <template v-for=" i in tagFilter(item.types)">
                                                <v-chip outlined class="pa-1 mx-1" :key="i">
                                                    {{ i }}
                                                </v-chip>
                                            </template>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <!-- {{item.types}} -->

                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </template>

            <!-- table data list -->
            <template v-else v-slot:default="props">
                <v-card class="ma-3 pa-5 elevation-3 rounded-xl">
                    <v-data-table single-expand :show-expand="isTagged" item-key="i_d" hide-default-footer :items-per-page.sync="itemsPerPage" :page="page" :search="search" @dblclick:row="toCoding" :headers="table.header" :items="props.items">

                        <template v-slot:item.rank="{ item }">
                            <v-rating background-color="grey lighten-1" :half-icon="ratingIcon.half" :full-icon="item.rank/2 >= 5 ? ratingIcon.full : ratingIcon.default" :value="item.rank/2" style="flex: none;" :color="ratingCol(item.rank)" dense half-increments readonly size="20"></v-rating>
                        </template>

                        <template v-slot:item.types="{ item }">
                            <v-icon @click="item.showTag = true">mdi-tag-plus-outline</v-icon>
                        </template>

                        <template v-slot:expanded-item="{ headers, item }">
                            <td v-if="item.types" class="ma-0 pa-3" :colspan="headers.length">
                                <template v-for=" (i,index) in tagFilter(item.types)">

                                    <v-chip color="info" class="ma-1" :key="index">
                                        {{ i }}
                                    </v-chip>
                                </template>
                            </td>
                        </template>

                    </v-data-table>
                </v-card>
            </template>

            <!-- Pagination -->
            <template v-slot:footer>
                <v-toolbar class="rounded-t-xl" :color="color" rounded dark flat>
                    <v-row class="ma-2" align="center" justify="center" background-color="primary">
                        <span class="font-weight-black">Items per page</span>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on }">

                                <v-btn outlined class="ml-2" v-on="on">
                                    {{ itemsPerPage }}
                                    <v-icon right>mdi-chevron-down</v-icon>
                                </v-btn>

                            </template>
                            <v-list>
                                <v-list-item v-for="(number, index) in itemsPerPageArray" :key="index" @click="updateItemsPerPage(number)">
                                    <v-list-item-title>{{ number }}</v-list-item-title>
                                </v-list-item>
                            </v-list>

                        </v-menu>

                        <v-spacer></v-spacer>
                        <span class="mr-4 font-weight-black">
                            Page {{ page }} of {{ numberOfPages }}
                        </span>
                        <v-btn fab dark color="dark darken-3" small class="mr-1" @click="formerPage">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn fab dark color="dark darken-3" small class="ml-1" @click="nextPage">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </v-toolbar>
            </template>

            <template v-slot:no-data>
                <v-row align="center" justify="center" style="height:300px;">
                    <v-col>
                        <v-btn :ripple="false" outlined style="border-color:transparent;" class="font-weight-black">Nothing Here But Tree.. <v-icon color="success" right>mdi-palm-tree</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </template>

        </v-data-iterator>
    </v-card>
</VueGlow>
</template>

<script>
import VueGlow from '../../../node_modules/vue-glow'
export default {
    name: 'taskTable',
    components: {
        VueGlow
    },
    props: {
        tasks: Array,
        color: String,
        title: String,
        animation: String,
        type: String,
        ccolor: String
    },
    data() {
        return {
            sortBy: 'i_d',
            page: 1,
            sortDesc: false,
            search: '',
            types: [],
            filter: {
                typeSingle: false,
                onlyPassed: false
            },
            itemsPerPage: 20,
            itemsPerPageArray: [12, 20, 30, 50],
            rank_range: [0, 10],
            table: {
                header: [{
                        text: 'ID',
                        value: 'i_d',
                    },
                    {
                        text: 'Title',
                        value: 'title',
                        sortable: false,
                        align: 'center',
                    },
                    {
                        text: 'Rank',
                        value: 'rank',
                        align: 'center',
                    },
                    // {
                    //     text: 'Author',
                    //     value: 'by',
                    //     align: 'center',
                    // },
                ],
                types: [
                    "Pattern",
                    "Basic I/O",
                    "Shift bit",
                    "If-Else",
                    "Loop",
                    "Array",
                    "Function",
                    "Pointer",
                ]
            },
            mode: false,
            ratingIcon: {
                full: "mdi-skull",
                half: "mdi-star-half-full",
                default: "mdi-star"
            }
        }
    },
    computed: {
        // pagination
        numberOfPages() {
            if (this.tasks)
                return Math.ceil(this.tasks.length / this.itemsPerPage)
            else return 0
        },
        filtered() {
            if (this.tasks)
                return this.tasks.filter((el) => {
                    var diff = el.rank
                    var inRank = diff >= this.rank_range[0] && diff <= this.rank_range[1]
                    var intype = true
                    var onlyPassed = true
                    if (this.types.length && el.types) {
                        var sp = "$.$"
                        var typeArr = el.types.split(sp)
                        console.log(el)
                        if (!this.filter.typeSingle) {
                            intype = typeArr.some(t => this.types.includes(t))
                        } else {
                            intype = typeArr.every(t => this.types.includes(t))
                        }
                    }
                    if (this.filter.onlyPassed) {
                        if (el.result)
                            for (let i = 0; i < el.result.length; i++) {
                                if (el.result.charAt(i) != 'P')
                                    onlyPassed = false
                            }
                    }
                    return (inRank && intype && onlyPassed);
                });
            else return []
        },
        isTagged() {
            var t = false
            this.table.header.forEach(el => {
                if (el.text == "Tags") {
                    t = true
                }
            })
            return t
        }
    },
    methods: {
        // pagination
        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number
        },
        toCoding(item, index) {
            var data
            if (typeof (index) == "number") {
                // click return (item , index)
                data = item
            } else {
                // dblclick return  (event , row )
                data = index.item
            }
            this.$router.push({
                name: 'Coding'
            })
            this.$cookies.set('task', data, '1d')
        },
        customFilter(items, search) {
            var allowRow = ["title"]
            return items.filter(el => {
                return allowRow.some(key => {
                    return el[key].toString().includes(search)
                })
            })
        },
        tagFilter(str) {
            return str.split("$.$")
        },
        ratingCol(rank) {
            var cols = ['lime lighten-1', 'amber', 'red']
            return cols[Math.floor(rank / 5)]
        },
    },
    created() {

        if (this.type == "submission") {
            this.table.header.push({
                text: 'Result',
                value: 'result',
                align: 'center',

            })
        } else if (this.type == "question") {
            this.table.header.push({
                text: 'Passed',
                value: 'finished',
                align: 'center',
            })
            this.table.header.push({
                text: 'Tags',
                value: 'data-table-expand'
            })
        }

    }
}
</script>

<style>
tbody>tr {
    margin: 100px !important;
}

.v-data-table-header {
    /* background: var(--theme-8); */
}

tbody tr:nth-of-type(even) {
    background-color: rgba(var(--themeRgb-8), .1);
}

.v-data-table tbody tr.v-data-table__expanded__content {
    box-shadow: none !important;
}

tbody>tr:hover {
    box-shadow:
        rgba(var(--themeRgb-8), 0.5) 0px 0px 9px 5px;
    background: inherit !important;
    /* transform: scaleY(1.2); */
    z-index: 15;
}
</style>
