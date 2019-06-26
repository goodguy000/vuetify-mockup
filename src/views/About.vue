<template>
  <div class="team">
    <h1 class="subheading grey--text">About Me</h1>
    <v-container class="my-5">
      <p>This mockup to practice about Vuejs only</p>
      <p>This site includes:</p>
      <ul>
        <li></li>
      </ul>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        {
          name: "Trung Nguyen",
          role: "Web developer",
          avatar: "/avatar-1.jpg"
        },
        { name: "Ryu", role: "Graphic designer", avatar: "/avatar-2.jpg" },
        { name: "Chun Li", role: "Web developer", avatar: "/avatar-4.jpg" }
      ]
    };
  }
};
</script>
