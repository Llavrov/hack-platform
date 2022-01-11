<template>
  <div class="pageContentContainer">
    <Xnavbar />
    <div class="horizPad">
      <div />
      <div class="solutionRoot pageContentRoot">
        <h1 v-t="'solution.head'" class="pageHeader" />
        <h2 class="minipageHeader">{{ $root.team?.name }}</h2>
        <div class="solutionContent" v-if="$root.show?.checkPointEnabled">
          <h2 class="minipageHeader">Чекпоинт</h2>
          <!-- <div class="explText n1">
            Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский
            набор слов, но это не совсем так. Его корни уходят в один фрагмент
            классической латыни
          </div> -->
          <div class="explText n2">
            Над какими задачами и номинациями вы работаете?
          </div>
          <div class="tasks">
            <div
              v-for="it of $root.tasks"
              :class="`btn4 ${task === it.id ? 'chosen' : ''}`"
              v-text="it.trackName"
              :key="it.id"
              @click="task = it.id"
            />
          </div>
          <!-- <div class="explText n3">Какие менторы вам нужны?</div>
          <div class="roles">
            <div
              v-for="it of memberRoles"
              :class="`btn4 ${role === it.id ? 'chosen' : ''}`"
              :key="it.id"
              v-text="it.label"
              @click="role = it.id"
            />
          </div> -->
          <Xinput
            id="descrStatus"
            label="solution.descrStatus"
            v-model="descrStatus"
            :placeholder="$t(`solution.descrStatusPh`)"
            area="t"
          />
          <Xinput
            id="todoFurther"
            label="solution.todoFurther"
            v-model="todoFurther"
            :placeholder="$t(`solution.todoFurtherPh`)"
            area="t"
          />
          <Xinput
            id="questions"
            label="solution.questions"
            v-model="questions"
            :placeholder="$t(`solution.questionsPh`)"
            area="t"
          />
          <div style="text-align: center">
            <button
              class="btn btn-primary btnLg"
              v-t="`solution.action`"
              @click="saveCheckpoint"
              style="width: 230px"
            />
          </div>
        </div>
        <div class="solutionContent n2" v-if="$root.show?.solutionEnabled">
          <h2 class="minipageHeader">Решение</h2>
          <div class="explText n1">
            <!-- Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский
            набор слов, но это не совсем так. Его корни уходят в один фрагмент
            классической латыни
            <br />
            <br /> -->
            <!-- <div v-if="!uploadDeadlinePassed">
              Дедлайн загрузки решения:
              {{ fmtDate($root.settings.fileUploadDeadLine) }}
            </div> -->
          </div>
          <Xselect
            id="resultTask"
            label="solution.resultTask"
            :options="
              $root.tasks.map((it) => ({ id: it.id, label: it.trackName }))
            "
            v-model="task"
          />
          <Xinput
            id="ideaDescr"
            label="solution.ideaDescr"
            v-model="solution.ideaDescription"
            :placeholder="$t(`solution.ideaDescrPl`)"
            area="t"
          />
          <Xinput
            id="codeLink"
            label="solution.codeLink"
            v-model="solution.codeLink"
            :placeholder="$t(`solution.codeLinkPl`)"
          />
          <Xinput
            id="demoLink"
            label="solution.demoLink"
            v-model="solution.demoLink"
            :placeholder="$t(`solution.demoLinkPl`)"
          />
          <Xinput
            id="presentationLink"
            label="Ссылка на презентацию"
            v-model="solution.presentationLink"
            placeholder="Ссылка на презентацию"
          />
          <!-- <p
            class="explText n4"
            style="width: 100%; font-weight: bold; margin-bottom: 20px"
            v-t="`solution.loadPresentation`"
          />
          <div
            style="width: 100%"
            class="badged presentationNameRoot"
            @click.prevent.stop="uploadPresentation"
          >
            <div>
              <XfileInput
                id="presentationName"
                :modelValue="solution.presentation"
                :placeholder="$t(`solution.presentationNamePl`)"
                @setFile="setPresentation"
              />
            </div>
            <div class="copyBadge">
              <div class="central">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.44 11.0499L12.25 20.2399C11.1242 21.3658 9.59723 21.9983 8.00505 21.9983C6.41286 21.9983 4.88589 21.3658 3.76005 20.2399C2.6342 19.1141 2.00171 17.5871 2.00171 15.9949C2.00171 14.4027 2.6342 12.8758 3.76005 11.7499L12.95 2.55992C13.7006 1.80936 14.7186 1.3877 15.78 1.3877C16.8415 1.3877 17.8595 1.80936 18.61 2.55992C19.3606 3.31048 19.7823 4.32846 19.7823 5.38992C19.7823 6.45138 19.3606 7.46936 18.61 8.21992L9.41005 17.4099C9.03476 17.7852 8.52577 17.996 7.99505 17.996C7.46432 17.996 6.95533 17.7852 6.58005 17.4099C6.20476 17.0346 5.99393 16.5256 5.99393 15.9949C5.99393 15.4642 6.20476 14.9552 6.58005 14.5799L15.07 6.09992"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div> -->
          <div style="text-align: center">
            <button
              class="btn btn-primary btnLg"
              @click.prevent="saveSolution"
              v-t="`solution.action`"
              style="width: 230px"
            />
          </div>
        </div>
      </div>
      <div />
    </div>
    <Xfooter />
  </div>
</template>

<script>
export default {
  name: "Solution",
  data() {
    return {
      task: null,
      role: 2,
      descrStatus: "",
      todoFurther: "",
      questions: "",
      resultTask: null,
      ideaDescr: "",
      codeLink: "",
      demoLink: "",
      presentation: null,
      solution: {
        task: null,
        demoLink: null,
        codeLink: null,
        ideaDescription: null,
        presentationLink: null,
      },
    };
  },
  computed: {
    presentationName() {
      return "";
    },
    uploadDeadlinePassed() {
      return this.transforms.dateFromServer(
        this.$root.settings.fileUploadDeadLine,
        false,
        (m) => m.toDate().getTime() < Date.now()
      );
    },
  },
  methods: {
    async saveCheckpoint() {
      await this.http.put(`/teams/${this.$root.user.teamId}/checkpoint`, {
        number: 1,
        status: this.descrStatus,
        todo: this.todoFurther,
        questions: this.questions,
      });
      await this.saveTrack();
      window.root.spawnToast("Отправлено");
    },
    async saveSolution() {
      await this.http.put(`/teams/${this.$root.user.teamId}/solution`, {
        ...this.solution,
        presentationId: this.solution.presentation?.id,
        presentation: null,
      });
      await this.saveTrack();
      window.root.spawnToast("Отправлено");
    },
    uploadPresentation(e) {
      if (e.target.blur) {
        e.target.blur();
      }
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("hidden", true);
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    },
    async setPresentation(file) {
      const res = await this.http.postForm("/files?fileType=SOLUTION", {
        file,
      });
      this.solution.presentation = res;
    },
    async saveTrack() {
      await this.http.put(`/teams/${this.$root.team.id}/track`, {
        trackId: this.task,
      });
    },
  },
  mounted() {
    let cp = this.$root.team.checkpoints?.find((it) => it.number === 1);
    if (cp) {
      this.descrStatus = cp.status;
      this.todoFurther = cp.todo;
      this.questions = cp.questions;
    }
    this.solution = this.$root.team.solutionDto || {
      task: null,
      demoLink: null,
      codeLink: null,
      ideaDescription: null,
      presentation: {
        id: null,
        filename: null,
        mediaType: null,
      },
    };
    this.task = this.$root.team?.trackDto?.id;
  },
};
</script>

<style lang="scss">
.solutionRoot {
  max-width: 630px !important;
  h1.pageHeader {
    margin-bottom: 25px;
  }
  h2.minipageHeader {
    width: 100%;
    color: #5878d2;
    margin-bottom: 25px !important;
  }
  .solutionContent {
    box-shadow: 0px 15px 30px rgba(7, 107, 156, 0.05);
    border-radius: 2px;
    padding: 38px 30px;
    background: var(--bgclr);
    &.n2 {
      margin-top: 40px;
    }
    h2.minipageHeader {
      color: var(--clr);
      margin-bottom: 25px;
    }
    .explText {
      max-width: 440px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      color: #8798ad;
      &.n1 {
        margin-bottom: 38px;
      }
      &.n2 {
        margin-bottom: 25px;
      }
      &.n3 {
        margin-bottom: 25px;
      }
    }
    .tasks {
      text-align: center;
      margin-bottom: 40px;
      > div {
        margin-bottom: 10px;
      }
    }
    .btn4 {
      margin-right: 18px;
      font-size: 16px;
      padding: 15px 35px;
      background-color: var(--bgclr2);
      display: inline-block;
      border-radius: 20px;
      cursor: pointer;
      &.chosen {
        background-color: rgba(var(--clr3), 1);
        color: #ffffff;
        font-weight: 700;
      }
    }
    .roles {
      text-align: center;
      margin-bottom: 24px;
      transform: translateY(-15px);
      > div {
        margin-top: 15px;
      }
    }
    #descrStatus,
    #todoFurther {
      margin-bottom: 28px;
    }
    #questions {
      margin-bottom: 40px;
    }
    #resultTask {
      margin-bottom: 26px;
    }
    #ideaDescr {
      margin-bottom: 26px;
    }
    #codeLink {
      margin-bottom: 26px;
    }
    #demoLink {
      margin-bottom: 26px;
    }
    .presentationNameRoot {
      cursor: pointer;
      margin-bottom: 40px;
    }
  }
}
.md .solutionContent {
  .task {
    margin-right: 12px;
  }
}
.sm .solutionContent {
  padding: 38px 10px;
  .explText {
    &.n1 {
      margin-bottom: 30px;
    }
    &.n2 {
      margin-bottom: 15px;
    }
    &.n3 {
      margin-bottom: 15px;
    }
  }
  .tasks {
    margin-bottom: 30px;
  }
  .btn4 {
    font-size: 14px;
    padding: 14px 29px 13px 29px;
    background-color: #fafafa;
    margin-bottom: 15px;
  }
  .roles {
    margin-bottom: 33px;
  }
}
</style>
