<template>
  <div>
    <MyButton label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew"/>
    <DataTable :value="users">
      <AppColumn field="name" header="name"></AppColumn>
      <AppColumn field="price" header="price"></AppColumn>
      <AppColumn field="description" header="description"></AppColumn>
      <AppColumn :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <MyButton icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                    @click="editProduct(slotProps.data)"/>
          <myButton icon="pi pi-trash" class="p-button-rounded p-button-warning"
                    @click="confirmDeleteProduct(slotProps.data)"/>
        </template>
      </AppColumn>
    </DataTable>
  </div>
  <MyDialog :header="changeheader" :visible="is_viable" :modal="true" :style="{ width: '450px' }"
            @update:visible="hideHandler">
    <div class="name">
      <label for="username">Name</label>
      <InputText id="username" v-model="product.name"   type="username" aria-describedby="username-help"
                 :style="product.style"/>
      <span v-if="is_empty()" style="color: red">khong dc de trong truong nay</span>
    </div>
    <div class="price">
      <label for="price">price</label>
      <InputText id="price" type="number" min="0" data-vv-as="field" v-model="product.price" aria-describedby="price-help" oninput="validity.valid||(value='');"
                 :style="{ width: '100%'}"/>
    </div>
    <div class="Description">
      <label for="username">Description</label>
      <MyTextarea v-model="product.description" rows="3" cols="20" :style="{ width: '100%' }"/>
    </div>
    <div class="">
      <MyButton label="Cancel" icon="pi pi-times" @click="closeAction()" :style="{ color: 'white' }"/>
      <MyButton label="Save" icon="pi pi-check" v-if="!is_validate()" @click="runAction()" :style="{ color: 'white' }" class="ml-2"/>
      <MyButton label="Save" icon="pi pi-check" v-else disabled="disabled" class="ml-2"/>
    </div>
  </MyDialog>

  <MyDialog header="Confirmation" :visible="displayConfirmation" :style="{width: '350px'}" :modal="true"  @update:visible="hideHandlerDelete">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
      <span>Are you sure you want to proceed?</span>
    </div>
    <template #footer>
      <MyButton label="No" icon="pi pi-times" @click="closeConfirmation()" class="p-button-text"/>
      <MyButton label="Yes" icon="pi pi-check" @click="confirmation()" class="p-button-text" autofocus/>
    </template>
  </MyDialog>
</template>

<script>

import {$fetch} from 'ohmyfetch'

export default {
  name: "ProductManager",

  data() {
    return {
      users: [],
      product: {},
      is_viable: false,
      linkFetchData: `${process.env.BASE_URL_API}/api/v1/products`,
      changeheader: '',
      isEdit: false,
      displayConfirmation: false,
      productDelete:{}

    }
  },
  created() {
    this.loadData()


  },mounted() {

  },
  methods: {

    async runAction() {
      if (this.isEdit) {          //editproduct
        // console.log()
        await this.updateProduct(this.product);
        await this.hideDialog();
        await this.loadData();

      } else {                //createproduct
        await this.createProduct(this.product);
        await this.hideDialog();
        await this.loadData();

      }
    },
    is_validate(){
      return this.is_empty()
    },

    is_empty(){
      if (this?.product?.name == '' || this?.product?.name == undefined || this?.product?.name == null) {
        return true
      } else {
        return false
      }
    },

    closeAction() {
      this.is_viable = false;
    },
    hideDialog() {
      this.is_viable = false;
    },
    editProduct(data) {
      this.isEdit = true;
      this.changeheader = 'Edit Product';
      this.is_viable = true;
      this.product = Object.assign({}, data);
      this.product.style={ width: '100%' }

    },

    async createProduct(data) {
      await $fetch(this.linkFetchData, {
        method: 'POST',
        body: data,
      });
    },
    async updateProduct(data) {
      await $fetch(`${this.linkFetchData}/${data.id}`, {
        method: 'PUT',
        body: data,
      });
    },
    async deleteProduct(data) {
      await $fetch(`${process.env.BASE_URL_API}/api/v1/products/${data.id}`, {
        method: 'DELETE',
      });
    },
     confirmDeleteProduct(data) {
       this.displayConfirmation = true;
       this.productDelete = data;
    },
    closeConfirmation() {
      this.displayConfirmation = false;
    },
    async confirmation() {
      this.displayConfirmation = false;
      await this.deleteProduct(this.productDelete);
      await this.loadData();

    },
    hideHandler(value) {
      if (!value) {
        this.is_viable = false;
      }
    },
    hideHandlerDelete(value) {
      if (!value) {
        this.displayConfirmation = false;
      }
    },
    openNew() {
      this.isEdit = false;
      this.is_viable = true;
      this.changeheader = 'Create Product';
      this.product= {};
      this.product.style={ width: '100%' }

    },
    fetchData() {
      return $fetch(this.linkFetchData);
    },
    async loadData() {
      const res = await this.fetchData();
      if (res) {
        this.users = res;
      }
    }

  }

}

</script>

<style scoped>

</style>