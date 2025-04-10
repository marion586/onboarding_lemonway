<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold text-center mb-8">
          Lemonway Onboarding
        </h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <el-card class="hover:shadow-lg transition-shadow">
            <NuxtLink to="/individual" class="block p-6 text-center">
              <h2 class="text-xl font-semibold mb-4">Individual Account</h2>
              <p class="text-gray-600">Create and manage your personal account</p>
            </NuxtLink>
          </el-card>

          <el-card class="hover:shadow-lg transition-shadow">
            <NuxtLink to="/legal-entity" class="block p-6 text-center">
              <h2 class="text-xl font-semibold mb-4">Legal Entity Account</h2>
              <p class="text-gray-600">Set up an account for your business or organization</p>
            </NuxtLink>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>