<template>
  <div class="update_div">
    <div class="update_form">
      <h1>My Profile Details</h1>
      <form @submit.prevent="updateProfile" class="signUp">
        <label for="username">Username</label>
        <input
          type="text"
          data-testid="username-input"
          v-model="username"
          placeholder="Username"
          required
        />
        <label for="username">E-Mail</label>
        <input
          type="text"
          data-testid="email-input"
          v-model="email"
          placeholder="E-Mail"
          required
        />
        <label for="Birthday">Birthday</label>
        <input
          placeholder="Birthday"
          data-testid="birthday-input"
          type="date"
          v-model="birthday"
          required
        />
        <button type="submit" data-testid="update-profile">
          Update Profile
        </button>
      </form>
      <button
        type="button"
        class="delete_profile"
        data-testid="delete-profile"
        @click="deleteProfile"
        style="margin-top: 20px"
      >
        Delete Profile
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { baseUrl } from "../utils/helpers";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getStoredUser, getToken } from "@/utils/helpers";
import type { UpdateResponse } from "@/types/index";

const username = ref<string>("");
const email = ref<string>("");
const birthday = ref<string>("");
const router = useRouter();

const formatDate = (date: string | Date | undefined): string => {
  if (!date) return "";
  const parsedDate = new Date(date).toISOString().split("T")[0];
  return parsedDate;
};

const updateProfile = async (): Promise<void> => {
  const confirmation = confirm("Are you sure you want to change your details?");
  if (!confirmation) {
    return;
  }
  const formattedBirthday = formatDate(birthday.value);

  try {
    const userData = getStoredUser();
    const token = getToken();
    if (!userData || !token) {
      return;
    }
    const response = await axios.put<UpdateResponse>(
      `${baseUrl}/users/update/${userData.Username}`,
      {
        Username: username.value,
        Email: email.value,
        Birthday: formattedBirthday,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      // the response date is not wrapped in updatedUser as it is the case for add movie return
      const updatedUser = { ...userData, ...response.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // console.log('udated User', updatedUser)
      username.value = updatedUser.Username;
      email.value = updatedUser.Email;
      birthday.value = formatDate(updatedUser.Birthday);

      alert("Profile updated successfully!");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        alert("Permission denied");
      } else if (error.response?.status === 409) {
        alert(
          `${username.value} already exists, please pick another Username.`
        );
      } else {
        console.error(
          "Error updating profile:",
          error.response?.data || error.message
        );
        alert("An unexpected error occurred. Please try again.");
      }
    } else {
      console.error("Unknown error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  }
};

const deleteProfile = async (): Promise<void> => {
  const confirmation = confirm(
    "Are you sure you want to delete your profile? This action cannot be undone."
  );

  if (!confirmation) {
    return;
  }
  try {
    const userData = getStoredUser();
    const token = getToken();
    if (!userData || !token) {
      return;
    }
    const response = await axios.delete(
      `${baseUrl}/users/deregister/${userData.Username}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push({ name: "SignUp" });
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error deleting profile:",
        error.response?.data || error.message
      );
      alert("Profile could not be deleted");
    } else {
      console.error("Unknown error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  }
};

onMounted(async (): Promise<void> => {
  try {
    const userData = getStoredUser();

    if (userData) {
      birthday.value = formatDate(userData.Birthday);
      username.value = userData.Username;
      email.value = userData.Email;
    }
  } catch (error: unknown) {
    console.error("Failed to parse user from localStorage:", error);
    // if want to clear the bad data
    // localStorage.removeItem('user');
  }
});
</script>
<style>
.delete_profile {
  width: 100%;
  color: rgb(194, 194, 194);
  height: 1.8rem;
  background-color: black;
  border-radius: 5px;
  border: none;
  font-weight: 500;
  font-size: 1.2rem;
  cursor: pointer;
  transition-duration: 250ms;
  transition-property: background-color;
}

.delete_profile:hover {
  background-color: rgb(97, 2, 2);
}
</style>
