<template>
  <div>
    <h1
      v-html="leads.message"
      :class="classObject"
    ></h1>
    <p>{{ leads.description }}</p>
    <button @click="changeTextSize">large</button>
    <button
      @click="addDescription"
    >
      add description
    </button>
    <hr>
    <child-component
      v-show="isShow"
    >
      <template #head>
        <p>head slot</p>
      </template>
      <template #default>
        <p>main slot</p>
        <p>main slot2</p>
      </template>
      <template #foot>
        <p>foot slot</p>
      </template>
    </child-component>
    <button @click="toggleShow">toggle isShow</button>
    <hr>
    <p v-if="id === 1">1</p>
    <template v-else-if="id === 2">
      <p>2-1</p>
      <p>2-2</p>
      <p>2-3</p>
    </template>
    <p v-else>other</p>
    <hr>
    <template v-for="item in items">
      <child-component
        :key="item.id"
        :title="item.title"
      >
        <span>slot content</span>
      </child-component>
    </template>
    <hr>
    <button @click="count++">Add to count</button>
    <p>{{ count }}回クリックしました</p>
    <hr>
    <input type="text" v-model="inputText">
    <p>computed: {{ getUpperCaseText }}</p>
    <p>methods: {{ showUpperCaseText() }}</p>
    <hr>
    <form>
      <div>
        <span>名前:</span>
        <input-text
          :value="form.name"
          @input="form.name = $event.target.value"
        >
        </input-text>
        <p>名前: {{ getInputName }}</p>
      </div>
      <div>
        <span>性別:</span>
        <label>
          男性
          <input type="radio" value="male" v-model="form.sex">
        </label>
        <label>
          女性
          <input type="radio" value="female" v-model="form.sex">
        </label>
        <p>性別: {{ getRadioValue }}</p>
      </div>
      <div>
        <select v-model="form.selected">
          <option disabled value="">--出身地を選択してください--</option>
          <option v-for="option in form.options"
            :value="option.value"
            :key="option.id"
          >
            {{ option.value }}
          </option>
        </select>
        <p>出身地:{{ getSelectValue }}</p>
      </div>
      <div>
        <label>
          <input type="checkbox" v-model="form.checked">
          20歳以上です
        </label>
        <p>チェックボックス: {{ getCheckBoxValue }}</p>
      </div>
    </form>
    <hr>
    <counter></counter>
    <hr>
    <input type="text" v-model="inputText">
    <p>computed: {{ getUpperCaseText }}</p>
    <p>methods: {{ showUpperCaseText }}</p>
    <hr>
    <template v-for="category in categories">
      <p :key="$uuid.v4()">
        {{ category }}
      </p>
    </template>
    <button @click="updateText">update text</button>
    <hr>
    <article v-for="post in posts"
     :key="$uuid.v4()"
    >
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </article>
  </div>
</template>

<script>
import ChildComponent from 'Components/ChildComponent';
import Counter from 'Components/Counter';
import inputText from 'Components/inputText';
import axios from 'axios';

export default {
  beforeCreate() {
    console.log('beforeCreate');
    console.log(this.leads);
  },
  created() {
    console.log('created');
    console.log(this.posts);
    axioss.get('/data.json').then(res => {
      thisposts = res.data.posts;
    });
  },
  //es6のメソッド記法
  data() {
    return {
      leads: {
        message: '<span>Hello Vue</span>',
        description: '',
      },
      isShow: true,
      id: 2,
      inputText: '',
      classObject: {
        'is-green': true,
      },
      items: [
        {
          id: this.$uuid.v4(),
          title: '1番目のリスト',
        },
        {
          id: this.$uuid.v4(),
          title: '２番目のリスト'
        },
        {
          id: this.$uuid.v4(),
          title: '3番目のリスト'
        }
      ],
      form: {
        name: '',
        sex: '',
        selected: '',
        options: [
          {
            id: this.$uuid.v4(),
            value: '東京都',
          },
          {
            id: this.$uuid.v4(),
            value: '埼玉県',
          },
          {
            id: this.$uuid.v4(),
            value: '神奈川県',
          },
          {
            id: this.$uuid.v4(),
            value: '千葉県',
          },
        ],
        checked: false,
      },
      categories: ['Javascript', 'jquery'],
      posts: [],
    }
  },
  methods: {
    incrementCount(){
      this.count++;
    },
    showUpperCaseText(){
      const upperCaseText = this.inputText.toUpperCase();
      console.log(`method: ${upperCaseText}`);
      return upperCaseText;
    },
    addDescription() {
      this.description = 'Vue-lesson';
      console.log(this);
      console.log(this.description);
    },
    changeTextSize() {
      this.$set(this.classObject, 'is-large', true);
    },
    toggleShow() {
      this.isShow = !this.isShow;
    },
    updateText() {
      this.$set(this.categories, 1, 'Vue.js');
    }
  },
  computed: {
    getUpperCaseText(){
      const upperCaseText = this.inputText.toUpperCase();
      console.log(`computed: ${upperCaseText}`);
      return upperCaseText;
    },
    getInputName() {
      return this.form.name;
    },
    getRadioValue() {
      return this.form.sex;
    },
    getSelectValue() {
      return this.form.selected;
    },
    getCheckBoxValue() {
      return this.form.checked;
    }
  },
  watch: {
    inputText(value, oldValue) {
      console.log(`value -> ${value}`);
      console.log(`oldValue -> ${oldValue}`);
    },
    'leads.description': {
      handler(){
        console.log('add description');
      },
      deep: true,
    }
  },
  components: {
      ChildComponent,
      Counter,
      inputText,
  }
}
</script>

<style scoped>
  .is-green {
    color: green;
  }
  .is-large {
    font-size: 48px;
  }
  hr {
    margin: 16px 0;
  }
</style>
