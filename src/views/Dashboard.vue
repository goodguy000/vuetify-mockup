<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-snackbar v-model="snackbar" :timeout="5000" top color="success">
        <span>Congratulation! You added a new project.</span>
        <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
      </v-snackbar>

      <v-layout row class="mb-3">
        <Popup @projectAdded="snackbar=true"/>

        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
            <v-icon left small>sort</v-icon>
            <span class="caption text-lowercase">By Project Name</span>
          </v-btn>
          <span>Sort projects by project name</span>
        </v-tooltip>

        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
            <v-icon left small>sort</v-icon>
            <span class="caption text-lowercase">By Person</span>
          </v-btn>
          <span>Sort by person name</span>
        </v-tooltip>
      </v-layout>

      <v-card>
        <v-layout row wrap class="pa-3">
          <v-flex xs12 md4>
            <div class="caption font-weight-bold">Title</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption font-weight-bold">Person</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption font-weight-bold">Due</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption font-weight-bold">Status</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption font-weight-bold">Actions</div>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md4>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <v-chip small :class="`${project.status} white--text caption mt-3`">{{ project.status }}</v-chip>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <v-tooltip top>
              <v-btn fab dark small color="cyan" slot="activator" @click="projectToEdit = true">
                <v-icon dark>edit</v-icon>
              </v-btn>
              <span class="caption">Edit</span>
            </v-tooltip>

            <v-tooltip top>
              <v-btn
                fab
                dark
                small
                color="red"
                slot="activator"
                @click="projectToDelete = true"
              >
                <v-icon dark>delete</v-icon>
              </v-btn>
              <span class="caption">Delete</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>

    <v-dialog v-model="projectToDelete" width="500">
      <v-card>
        <v-card-title class="headline teal lighten-3" primary-title>Confirmation</v-card-title>
        <v-card-text>Sorry, you have no permission to delete this project.</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="projectToDelete = null">OK</v-btn>
          <v-btn color="primary" flat @click="projectToDelete = null">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="projectToEdit" width="500">
      <v-card>
        <v-card-title class="headline teal lighten-3" primary-title>Notification</v-card-title>
        <v-card-text><p>This is mockup to practice about Vuejs.</p>
          <p>I will update this function soon.</P>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="projectToEdit = null">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Popup from "../components/Popup";
import db from "@/firebase";

export default {
  data() {
    return {
      projects: [],
      snackbar: false,
      projectToDelete: null,
      projectToEdit: null
    };
  },
  components: {
    Popup
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  },
  created() {
    db.collection("projects").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  },
  computed: {}
};
</script>

<style>
.project:hover {
  background-color: #f1f1f1;
}
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
.v-chip.complete {
  background: #3cd1c2;
}
.v-chip.ongoing {
  background: orange;
}
.v-chip.overdue {
  background: tomato;
}
</style>