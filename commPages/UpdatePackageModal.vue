<!-- UpdatePackageModal.vue -->
<template>
	<div class="modal" v-if="visible">
		<div class="modal-content">
			<div class="modal-header">
				<span class="close" @click="closeModal">&times;</span>
				<h2>修改包裹信息</h2>
			</div>
			<div class="modal-body">
				<div class="form-group" v-for="(value, key) in formData" :key="key">
					<label>{{ key }}</label>
					<input v-model="formData[key]" type="text" />
					<hr />
				</div>
			</div>
			<div class="modal-footer">
				<button class="save-button" @click="saveChanges">保存</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			initialData: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				formData: {
					...this.initialData
				}
			};
		},
		methods: {
			closeModal() {
				this.$emit('close');
			},
			saveChanges() {
				this.$emit('save', this.formData);
			}
		},
		watch: {
			initialData(newData) {
				this.formData = {
					...newData
				};
			}
		}
	};
</script>

<style scoped>
	.modal {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal-content {
		background-color: white;
		border-radius: 20px;
		width: 80%;
		max-width: 600px;
		padding: 20px;
		position: relative;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e5e5e5;
	}

	.close {
		cursor: pointer;
		font-size: 24px;
	}

	.modal-body {
		padding: 20px 0;
	}

	.form-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	input {
		flex: 1;
		margin-left: 10px;
		padding: 5px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	hr {
		border: 0;
		height: 1px;
		background-color: #e5e5e5;
		margin: 10px 0;
	}

	.save-button {
		background-color: #3d7eff;
		color: white;
		border: none;
		border-radius: 20px;
		padding: 10px 20px;
		cursor: pointer;
	}
</style>