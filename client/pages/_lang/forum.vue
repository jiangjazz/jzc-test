<template>
  <div class="page-index">
    <AppHeader />
    <AppNav />

    <v-container>
      <input type="file" name="" id="" ref="file" @change="onFileChange">
      <v-btn type="success" @click.stop="upload">Upload</v-btn>
    </v-container>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['countryList']),
    ...mapGetters(['formatCountryList'])
  },
  data() {
    return {
      file: null
    }
  },
  methods: {
    upload() {
      console.log(this.$refs.file.file)
    },
    onFileChange($event) {
      const files = $event.target.files || $event.dataTransfer.files
      let data = new FormData()
      console.log(files)
      // for(let i = 0; i < files.length; i++) {
      //   data.append('data', files[i], files[i].name)
      // }
      data.append('Filedata', files[0], files[0].name)
      // [...files].forEach(file => {
      //   data.append('data', file, file.name) // currently only one file at a time
      // })
      console.log(data, files[0])
      this.$axios.post('http://xclub.pre.transsion.net/api/mobile/index.php?version=10&module=upload_file', data)
      // this.$axios.post('http://xclub.pre.transsion.net/api/mobile/index.php?version=5&module=uploadimage', data)
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

