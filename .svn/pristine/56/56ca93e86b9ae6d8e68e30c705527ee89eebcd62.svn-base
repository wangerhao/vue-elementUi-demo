<template>
	<div id="example">
		<p>Original message: "{{ message }}"</p>
		<p>Computed reversed message: "{{ reversedMessage }}"</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				message: 'Hello'
			}
		},
		created: function() {
			// `this` 指向 vm 实例
			console.log('a is: ' + this.a)
		},
		computed: {
			// 计算属性的 getter
			reversedMessage: function() {
				// `this` 指向 vm 实例
				return this.message.split('').reverse().join('')
			}
		},
		methods: {
			foo() {}
		}
	}
</script>

<style>

</style>