<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between">
        <nuxt-link to="/"><span>Back</span></nuxt-link>
     <h1 class="text-3xl font-bold text-center mb-8">Individual Account Creation</h1>
      </div>
      

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="handleSubmit"
      >
        <!-- Personal Information -->
        <el-card class="mb-6">
          <h2 class="text-xl font-semibold mb-4">Personal Information</h2>

          <el-form-item label="First Name" prop="individual.firstName">
            <el-input v-model="form.individual.firstName" />
          </el-form-item>

          <el-form-item label="Last Name" prop="individual.lastName">
            <el-input v-model="form.individual.lastName" />
          </el-form-item>

          <el-form-item label="Birth Date" prop="individual.birthDate">
            <el-date-picker
              v-model="form.individual.birthDate"
              type="date"
              placeholder="Select date"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="Email" prop="individual.email">
            <el-input v-model="form.individual.email" type="email" />
          </el-form-item>

          <el-form-item label="Nationalities" prop="individual.nationalities">
            <el-select 
              v-model="form.individual.nationalities" 
              multiple 
              style="width: 100%"
              placeholder="Select nationalities"
            >
              <el-option
                v-for="country in countries"
                :key="country.code"
                :label="country.name"
                :value="country.code"
              />
            </el-select>
          </el-form-item>
        </el-card>

        <!-- Birth Information -->
        <el-card class="mb-6">
          <h2 class="text-xl font-semibold mb-4">Birth Information</h2>

          <el-form-item label="Birth Country" prop="individual.birthCountry">
            <el-select v-model="form.individual.birthCountry" style="width: 100%">
              <el-option
                v-for="country in countries"
                :key="country.code"
                :label="country.name"
                :value="country.code"
              />
            </el-select>
          </el-form-item>
        </el-card>

        <!-- Address -->
        <el-card class="mb-6">
          <h2 class="text-xl font-semibold mb-4">Address</h2>

          <el-form-item label="Country" prop="individual.address.country">
            <el-select v-model="form.individual.address.country" style="width: 100%">
              <el-option
                v-for="country in countries"
                :key="country.code"
                :label="country.name"
                :value="country.code"
              />
            </el-select>
          </el-form-item>
        </el-card>

        <div class="flex justify-end">
          <el-button type="primary" native-type="submit" :loading="loading">
            Create Account
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

// Example country data - replace with complete ISO 3166-1 list
const countries = [
  { name: 'France', code: 'FR' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'United States', code: 'US' },
  // Add all other countries...
] as const;

const api = useApi();
const formRef = ref<FormInstance>();
const loading = ref(false);

const form = reactive({
  individual: {
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    birthCountry: '',
    nationalities: ['FR'],
    address: {
      country: 'FR'
    }
  },
  redirectUrl: 'https://www.lemonway.com',

});

const rules: FormRules = {
  'individual.firstName': [{ required: true, message: 'First name is required', trigger: 'blur' }],
  'individual.lastName': [{ required: true, message: 'Last name is required', trigger: 'blur' }],
  'individual.birthDate': [{ required: true, message: 'Birth date is required', trigger: 'change' }],
  'individual.email': [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: ['blur', 'change'] }
  ],
  'individual.birthCountry': [{ required: true, message: 'Birth country is required', trigger: 'change' }],
  'individual.nationalities': [{ required: true, message: 'At least one nationality is required', trigger: 'change' }],
  'individual.address.country': [{ required: true, message: 'Country is required', trigger: 'change' }]
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    loading.value = true;

    // Create the account first
    const accountResponse = await api.createIndividualAccount(form);
    
    if (accountResponse.id) {
      // Then create the onboarding with the account ID
      const onboardingResponse = await api.createIndividualOnboarding(
        accountResponse.id, 
        form.individual
      );
      
      // Use the URL from the onboarding response
      if (onboardingResponse.url) {
        window.location.href = onboardingResponse.url;
      }
    }
  } catch (error) {
    console.error('Account creation failed:', error);
    ElMessage.error('An error occurred. Please try again.');
  } finally {
    loading.value = false;
  }
};
</script>