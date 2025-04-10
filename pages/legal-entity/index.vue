<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between">
        <nuxt-link to="/"><span>Back</span></nuxt-link>
      <h1 class="text-3xl font-bold text-center mb-8">Legal Entity Account Creation</h1>
      </div>
      
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="handleSubmit"
      >
        <el-card class="mb-6">
          <h2 class="text-xl font-semibold mb-4">Company Information</h2>
          
          <el-form-item label="Company Name" prop="legalEntity.name">
            <el-input v-model="form.legalEntity.name" />
          </el-form-item>

          <el-form-item label="Company Type" prop="legalEntity.type">
            <el-select v-model="form.legalEntity.type" style="width: 100%">
              <el-option label="Company" value="COMPANY" />
              <el-option label="Association" value="ASSOCIATION" />
              <el-option label="Sole Trader" value="SOLE_TRADER" />
            </el-select>
          </el-form-item>

          <el-form-item label="Registration Number" prop="legalEntity.registrationNumber">
            <el-input v-model="form.legalEntity.registrationNumber" />
          </el-form-item>

          <el-form-item label="Registration Country" prop="legalEntity.registrationCountry">
            <el-select v-model="form.legalEntity.registrationCountry" style="width: 100%">
              <el-option label="France" value="FR" />
              <el-option label="Madagascar" value="MG" />
              <el-option label="United Kingdom" value="GB" />
            </el-select>
          </el-form-item>

          <el-form-item label="Registration Date" prop="legalEntity.registrationDate">
            <el-date-picker
              v-model="form.legalEntity.registrationDate"
              type="date"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />
          </el-form-item>
        </el-card>

        <el-card class="mb-6">
          <h2 class="text-xl font-semibold mb-4">Legal Representative</h2>
          
          <el-form-item label="First Name" prop="legalRepresentative.firstName">
            <el-input v-model="form.legalRepresentative.firstName" />
          </el-form-item>

          <el-form-item label="Last Name" prop="legalRepresentative.lastName">
            <el-input v-model="form.legalRepresentative.lastName" />
          </el-form-item>

          <el-form-item label="Birth Date" prop="legalRepresentative.birthDate">
            <el-date-picker
              v-model="form.legalRepresentative.birthDate"
              type="date"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="Email" prop="legalRepresentative.email">
            <el-input v-model="form.legalRepresentative.email" type="email" />
          </el-form-item>

          <el-form-item label="Birth Country" prop="legalRepresentative.birthCountry">
            <el-select v-model="form.legalRepresentative.birthCountry" style="width: 100%">
              <el-option label="France" value="FR" />
              <el-option label="Madagascar" value="MG" />
              <el-option label="United Kingdom" value="GB" />
            </el-select>
          </el-form-item>

          <el-form-item label="Residence Country" prop="legalRepresentative.address.country">
            <el-select v-model="form.legalRepresentative.address.country" style="width: 100%">
              <el-option label="France" value="FR" />
              <el-option label="Madagascar" value="MG" />
              <el-option label="United Kingdom" value="GB" />
            </el-select>
          </el-form-item>

          <el-form-item label="Nationality" prop="legalRepresentative.nationalities">
            <el-select 
              v-model="form.legalRepresentative.nationalities" 
              multiple 
              style="width: 100%"
            >
              <el-option label="France" value="FR" />
              <el-option label="Madagascar" value="MG" />
              <el-option label="United Kingdom" value="GB" />
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

const api = useApi();
const loading = ref(false);
const formRef = ref<FormInstance>();

const form = reactive({
  legalEntity: {
    name: '',
    type: 'COMPANY' as 'COMPANY' | 'ASSOCIATION' | 'SOLE_TRADER',
    registrationNumber: '',
    registrationCountry: 'FR',
    registrationDate: '',
  },
  legalRepresentative: {
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    address: {
      country: 'FR'
    },
    birthCountry: 'FR',
    nationalities: ['FR'] as string[]
  },
  redirectUrl: 'https://www.lemonway.com'
});

const rules: FormRules = {
  'legalEntity.name': [
    { required: true, message: 'Company name is required', trigger: 'blur' },
    { min: 2, message: 'Company name must be at least 2 characters', trigger: 'blur' }
  ],
  'legalEntity.type': [
    { required: true, message: 'Company type is required', trigger: 'change' }
  ],
  'legalEntity.registrationNumber': [
    { required: true, message: 'Registration number is required', trigger: 'blur' },
    { min: 2, message: 'Registration number must be at least 2 characters', trigger: 'blur' }
  ],
  'legalEntity.registrationCountry': [
    { required: true, message: 'Registration country is required', trigger: 'change' }
  ],
  'legalEntity.registrationDate': [
    { required: true, message: 'Registration date is required', trigger: 'change' }
  ],
  'legalRepresentative.firstName': [
    { required: true, message: 'First name is required', trigger: 'blur' },
    { min: 2, message: 'First name must be at least 2 characters', trigger: 'blur' }
  ],
  'legalRepresentative.lastName': [
    { required: true, message: 'Last name is required', trigger: 'blur' },
    { min: 2, message: 'Last name must be at least 2 characters', trigger: 'blur' }
  ],
  'legalRepresentative.birthDate': [
    { required: true, message: 'Birth date is required', trigger: 'change' }
  ],
  'legalRepresentative.email': [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
  ],
  'legalRepresentative.birthCountry': [
    { required: true, message: 'Birth country is required', trigger: 'change' }
  ],
  'legalRepresentative.address.country': [
    { required: true, message: 'Residence country is required', trigger: 'change' }
  ],
  'legalRepresentative.nationalities': [
    { 
      type: 'array',
      required: true,
      message: 'At least one nationality must be selected',
      trigger: 'change',
      validator: (_, value, callback) => {
        if (value && value.length > 0) {
          callback();
        } else {
          callback(new Error('At least one nationality must be selected'));
        }
      }
    }
  ]
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  
  try {
    await formRef.value.validate();
    loading.value = true;
    
    // Create account
    const accountResponse = await api.createLegalEntityAccount({
      legalEntity: form.legalEntity,
      legalRepresentative: form.legalRepresentative,
      profile: 'PROJECT_HOLDER'
    });
    
    // Create onboarding
    const onboardingResponse = await api.createLegalEntityOnboarding(
      accountResponse.id,
    {legalEntity: {...form.legalEntity , address:form.legalRepresentative.address},
      legalRepresentative: form.legalRepresentative,}
    );
    
    // Redirect to onboarding URL
    if (onboardingResponse.url) {
      window.location.href = onboardingResponse.url;
    }
  } catch (error) {
    ElMessage.error('An error occurred. Please try again.');
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>