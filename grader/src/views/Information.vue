<template>
<div style="height:100%">
    <v-textarea color="white" height="80vh" solo hide-details auto-grow no-resize readonly :value="text">
        {{text}}
    </v-textarea>
    <prism-editor :code="code" class="twilight" language="cpp" line-numbers></prism-editor>

</div>
</template>

<script>

import PrismEditor from 'vue-prism-editor'

export default {
    components: {
        PrismEditor,
    },
    data() {
        return {
            text: " {\nfront-end : Glairy,\nback-end : nonkung51,\ngrader/compiler : eXitHere,\nserver : RedZero\n},\n{\nProject-Name : Grader CE Boost-up 8 , \nVersion : 1.2, \nStaff : { \n} \n} ",
            code: "/*\nDavid Cary 2010-09-14\nquick demo for wikibooks\npublic domain\n*/\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> pick_vector_with_biggest_fifth_element(\n    vector<int> left,\n    vector<int> right\n){\n    if( (left[5]) < (right[5]) ){\n        return( right );\n    };\n    // else\n    return( left );\n}\n\nint vector_demo(void){\n    cout << \"vector demo\" << endl;\n    vector<int> left(7);\n    vector<int> right(7);\n\n    left[5] = 7;\n    right[5] = 8;\n    cout << left[5] << endl;\n    cout << right[5] << endl;\n    vector<int> biggest(\n        pick_vector_with_biggest_fifth_element( left, right )\n    );\n    cout << biggest[5] << endl;\n\n    return 0;\n}\n\nint main(void){\n    vector_demo();\n}"
        }
    },
    created() {},
}
</script>
