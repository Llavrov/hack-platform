<template>
  <div class="pageContentContainer">
    <Xnavbar />
    <div class="horizPad">
      <div />
      <div class="settingsRoot pageContentRoot">
        <div class="card">
          <div class="card-header">Название хакатона</div>
          <div class="card-body">
            <div>
              <input id="hackName" class="form-control" v-model="hackName" />
            </div>
            <br />
            <button class="btn btn-primary" @click="apply('hackName')">
              Применить
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Треки</div>
          <div class="card-body">
            <div v-for="(it, i) of tasks.filter((it) => !it.rm_)" :key="i">
              <div>
                <div class="fr">
                  <input class="form-control" v-model="it.trackName" />
                  <div style="width: 2rem"></div>
                  <a
                    class="lbtn1"
                    style="cursor: pointer"
                    @click.prevent="it.rm_ = true"
                    ><unicon name="times" fill="#ff2222"></unicon
                  ></a>
                </div>
              </div>
              <br />
            </div>
            <a
              class="lbtn1"
              style="cursor: pointer"
              @click.prevent="tasks.push({ trackName: null })"
              ><unicon name="plus" fill="#22ff22"></unicon
            ></a>
            <br />
            <br />
            <button class="btn btn-primary" @click="applyTasks()">
              Применить
            </button>
          </div>
        </div>
        <div class="card narrowBlock">
          <div class="card-header">Открытие и закрытие регистрации</div>
          <div class="card-body">
            <div style="height: 5rem">
              Пользователи смогут зарегестрироваться только между этими двумя
              датами
            </div>
            Открытие:
            <input
              type="date"
              class="form-control"
              id="opens"
              v-model="opens"
            />
            <br /><br />
            Закрытие:
            <input
              type="date"
              class="form-control"
              id="closes"
              v-model="closes"
            />
            <br /><br />
            <button class="btn btn-primary" @click="apply('times')">
              Применить
            </button>
          </div>
        </div>
        <div class="card narrowBlock">
          <div class="card-header">Дата подтверждения и загрузки решений</div>
          <div class="card-body">
            <div style="height: 5rem">
              Пользователи смогут подтвердить участие не позднее указаной даты
            </div>
            Дата окончания подтверждения:
            <input
              type="date"
              class="form-control"
              id="confirmBy"
              v-model="confirmBy"
            />
            <br /><br />
            <div class="fr">
              <div style="max-width: 1px">
                <span>&nbsp;</span>
                <input
                  type="date"
                  class="form-control"
                  id="uploadBy"
                  v-model="uploadBy"
                />
              </div>
              <div style="flex-grow: 1">
                <br />
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="show.solution"
                    id="show.solution"
                  />
                  <label
                    class="form-check-label"
                    for="show.solution"
                    style="color: var(--clr)"
                  >
                    Разрешить загрузку решений
                  </label>
                </div>
              </div>
            </div>
            <br /><br />
            <button
              class="btn btn-primary"
              @click="
                apply('confirm-date');
                apply('show/enableSolution');
              "
            >
              Применить
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Показывать секции</div>
          <div class="card-body">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="show.onlineactivities"
                id="show.onlineactivities"
                @change="apply('show/enableOnlineActivities')"
              />
              <label
                class="form-check-label"
                for="show.onlineactivities"
                style="color: var(--clr)"
              >
                #OnlineActivities
              </label>
            </div>
            <br />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="show.checkpoint"
                id="show.checkpoint"
                @change="apply('show/enableCheckPoint')"
              />
              <label
                class="form-check-label"
                for="show.checkpoint"
                style="color: var(--clr)"
              >
                Чекпоинт
              </label>
            </div>
            <br />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="show.solution"
                id="show.solution"
                @change="apply('show/enableSolution')"
              />
              <label
                class="form-check-label"
                for="show.solution"
                style="color: var(--clr)"
              >
                Решение
              </label>
            </div>
            <br />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="show.acceptDeadline"
                id="show.acceptDeadline"
                @change="apply('show/acceptDeadlineEnabled')"
              />
              <label
                class="form-check-label"
                for="show.acceptDeadline"
                style="color: var(--clr)"
              >
                Дата окончания подтверждения
              </label>
            </div>
            <br />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="show.registrationDeadline"
                id="show.registrationDeadline"
                @change="apply('show/registrationDeadline')"
              />
              <label
                class="form-check-label"
                for="show.registrationDeadline"
                style="color: var(--clr)"
              >
                Дата окончания регистрации
              </label>
            </div>
            <br />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="show.news"
                id="show.news"
                @change="apply('show/news')"
              />
              <label
                class="form-check-label"
                for="show.news"
                style="color: var(--clr)"
              >
                Новости
              </label>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Новости</div>
          <div class="card-body">
            <div
              class="card"
              v-for="it of news.filter((it) => !it.rm)"
              :key="it.nothing"
            >
              <div class="card-header">
                <div class="fr">
                  <div class="fc">
                    <div class="f1" />
                    <span>Заголовок:&nbsp;</span>
                    <div class="f1" />
                  </div>
                  <div style="width: 2rem"></div>
                  <input
                    v-model="it.header"
                    class="form-control f1"
                    @input="it.changed = true"
                  />
                  <div style="width: 2rem"></div>
                  <a
                    class="lbtn1"
                    style="cursor: pointer"
                    @click.prevent="it.rm = true"
                  >
                    <unicon name="times" fill="#ff2222"></unicon
                  ></a>
                </div>
              </div>
              <div class="card-body">
                <div class="fr">
                  <div class="fc">
                    <div class="f1" />
                    <span style="white-space: nowrap"
                      >Медиа-элемент:&nbsp;</span
                    >
                    <div class="f1" />
                  </div>
                  <div style="width: 2rem"></div>
                  <input
                    class="form-control f1"
                    v-model="it.media"
                    @input="it.changed = true"
                  />
                </div>
                <br />
                <div>
                  <Quill
                    theme="snow"
                    contentType="html"
                    :content="it.text"
                    @update:content="
                      it.text = $event;
                      it.changed = true;
                    "
                  />
                </div>
              </div>
            </div>
            <br />
            <a
              class="lbtn1"
              style="cursor: pointer"
              @click.prevent="
                news.push({ header: null, text: null, media: null })
              "
              ><unicon name="plus" fill="#22ff22"></unicon
            ></a>
            <br />
            <br />
            <button class="btn btn-primary" @click="applyNews()">
              Применить
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Дополнительные настройки</div>
          <div class="card-body">
            <input
              class="form-check-input"
              type="checkbox"
              id="allowMinors"
              v-model="allowMinors"
              @input="apply('minors')"
            />
            <label
              for="allowMinors"
              class="form-check-label"
              style="color: var(--clr)"
              >&nbsp;Разрешить участие несовершеннолетних</label
            >
          </div>
        </div>
        <div class="card narrowBlock">
          <div class="card-header">Минимальный размер команды</div>
          <div class="card-body">
            <input
              class="form-control"
              type="number"
              id="minTeamSize"
              v-model="minTeamSize"
              @input="apply('maxTeamSize')"
            />
          </div>
        </div>
        <div class="card narrowBlock">
          <div class="card-header">Максимальный размер команды</div>
          <div class="card-body">
            <input
              class="form-control"
              type="number"
              id="maxTeamSize"
              v-model="maxTeamSize"
              @input="apply('maxTeamSize')"
            />
          </div>
        </div>
        <div class="card">
          <div class="card-header">Шаблоны писем</div>
          <div class="card-body">
            <template v-for="it of mailTemplates" :key="it.id">
              <div class="fr">
                <div class="fc">
                  <div class="f1" />
                  <span style="white-space: nowrap">Тип письма:&nbsp;</span>
                  <div class="f1" />
                </div>
                <div style="width: 2rem"></div>
                <div class="fc">
                  <div class="f1" />
                  <h6
                    v-text="mailTypes[it.templateName]"
                    style="font-weight: bold; margin-bottom: 0"
                  />
                  <div class="f1" />
                </div>
              </div>
              <br />
              <div class="fr">
                <div class="fc">
                  <div class="f1" />
                  <span style="white-space: nowrap">Тема:&nbsp;</span>
                  <div class="f1" />
                </div>
                <div style="width: 2rem"></div>
                <input
                  class="form-control f1"
                  v-model="it.subject"
                  @input="it.changed = true"
                />
              </div>
              <br />
              <div>
                <Quill
                  theme="snow"
                  contentType="html"
                  :content="it.body"
                  @update:content="
                    it.body = $event;
                    it.changed = true;
                  "
                />
              </div>
              <br />
              <br />
            </template>
            <button class="btn btn-primary" @click="applyMailTemplates()">
              Применить
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Белый список почтовых адресов</div>
          <div class="card-body">
            <textarea
              id="whitelistedEmails"
              class="form-control"
              style="resize: vertical !important"
              v-model="whitelistedEmails"
            ></textarea>
            <br />
            <button class="btn btn-primary" @click="apply('whitelist')">
              Применить
            </button>
          </div>
        </div>
        <div class="card narrowBlock">
          <div class="card-header">Текст ожидания</div>
          <div class="card-body">
            <textarea
              id="waitlistText"
              class="form-control"
              style="resize: vertical !important"
              v-model="waitlistText"
            ></textarea>
            <br />
            <button class="btn btn-primary" @click="apply('wait-list')">
              Применить
            </button>
          </div>
        </div>
        <div class="card narrowBlock">
          <div class="card-header">Текст принятия</div>
          <div class="card-body">
            <textarea
              id="acceptanceText"
              class="form-control"
              style="resize: vertical !important"
              v-model="acceptanceText"
            ></textarea>
            <br />
            <button class="btn btn-primary" @click="apply('acceptance')">
              Применить
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Текст подтверждения</div>
          <div class="card-body">
            <textarea
              id="confirmationText"
              class="form-control"
              style="resize: vertical !important"
              v-model="confirmationText"
            ></textarea>
            <br />
            <button class="btn btn-primary" @click="apply('confirmation')">
              Применить
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Текст при регистрации</div>
          <div class="card-body">
            <div v-for="it of adminFiles" :key="it.id">
              <div>
                <div class="fr">
                  <input class="form-control" v-model="it.originalFileName" />
                  <div style="width: 2rem"></div>
                  <a
                    class="lbtn1"
                    style="cursor: pointer"
                    @click.prevent="rmAdminFile(it)"
                    ><unicon name="times" fill="#ff2222"></unicon
                  ></a>
                </div>
              </div>
              <br />
            </div>
            <a class="lbtn1" style="cursor: pointer" @click.prevent="addFile"
              ><unicon name="plus" fill="#22ff22"></unicon
            ></a>
            <br />
            <br />
            <div>
              <Quill
                v-if="conventionString && conventionString !== ''"
                theme="snow"
                contentType="html"
                :content="conventionString"
                @update:content="conventionString = $event"
              />
            </div>
            <br />
            <button class="btn btn-primary" @click="apply('conventionString')">
              Применить
            </button>
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
  name: "Settings",
  data() {
    return {
      whitelistedEmails: "",
      waitlistText: "",
      acceptanceText: "",
      confirmationText: "",
      allowMinors: "",
      opens: null,
      closes: null,
      confirmBy: null,
      uploadBy: null,
      maxTeamSize: 5,
      minTeamSize: 1,
      show: {
        onlineactivities: false,
        solution: false,
        checkpoint: false,
        acceptDeadline: false,
        registrationDeadLine: false,
      },
      hackName: "",
      tou: "",
      privacy: "",
      news: [],
      tasks: [],
      mailTemplates: [],
      mailTypes: {
        "email-verify": "Подтверждение почты",
        "email-link-action": "Сброс пароля инициирован",
        "email-basic": "Пароль изменен",
      },
      adminFiles: [],
      conventionString: "",
    };
  },
  methods: {
    async apply(fldName) {
      let body = {};
      let method = "put";
      if (fldName === "times") {
        body.openTime = this.transforms.dateToServer(this.opens);
        body.closeTime = this.transforms.dateToServer(this.closes);
      } else if (fldName === "confirm-date") {
        body = this.transforms.dateToServer(this.confirmBy);
      } else if (fldName === "file-upload-deadline") {
        body = this.transforms.dateToServer(this.uploadBy);
      } else if (fldName === "whitelist") {
        body = this.whitelistedEmails.replace(/\r/, "").split("\n");
      } else if (fldName === "wait-list") {
        body = this.waitlistText;
      } else if (fldName === "acceptance") {
        body = this.acceptanceText;
      } else if (fldName === "confirmation") {
        body = this.confirmationText;
      } else if (fldName === "minors") {
        body = this.allowMinors;
      } else if (fldName === "show") {
        body = this.show;
      } else if (fldName === "maxTeamSize") {
        body = {
          maxTeamSize: this.maxTeamSize,
          minTeamSize: this.minTeamSize,
        };
      } else if (fldName.startsWith("show/")) {
        if (fldName === "show/enableCheckPoint") {
          body = this.show.checkpoint + "";
        } else if (fldName === "show/enableOnlineActivities") {
          body = this.show.onlineactivities + "";
        } else if (fldName === "show/enableSolution") {
          body = this.show.solution + "";
        } else if (fldName === "show/acceptDeadlineEnabled") {
          body = this.show.acceptDeadline + "";
        } else if (fldName === "show/registrationDeadline") {
          body = this.show.registrationDeadline + "";
        } else if (fldName === "show/news") {
          body = this.show.news + "";
        }
      } else if (fldName === "tou") {
        body = this.tou;
      } else if (fldName === "privacy") {
        body = this.privacy;
      } else if (fldName === "hackName") {
        body = this.hackName;
      } else if (fldName === "conventionString") {
        body = this.conventionString;
      }
      await this.http[method](`/settings/${fldName}`, body);
      await this.$root.updateSettings();
      this.$root.spawnToast("Настройки сохранены");
    },
    async applyNews() {
      for (let it of this.news) {
        if (it.rm) {
          await this.http.delete_(`/news/${it.id}`);
        } else if (!it.id) {
          await this.http.post(`/news`, it);
        } else if (it.changed) {
          await this.http.put(`/news/${it.id}`, it);
        }
      }
      this.fetchNews();
    },
    async applyTasks() {
      for (let it of this.tasks) {
        if (it.rm) {
          await this.http.delete_(`/tracks/${it.id}`);
        } else if (!it.id) {
          await this.http.post(`/tracks`, it);
        } else if (it.changed) {
          await this.http.put(`/tracks/${it.id}`, it);
        }
      }
      this.fetchTracks();
    },
    async applyMailTemplates() {
      for (let it of this.mailTemplates) {
        if (!it.id) {
          await this.http.post(`/email-templates`, it);
        } else if (it.changed) {
          await this.http.put(`/email-templates/${it.id}`, it);
        }
      }
    },
    async fetchNews() {
      this.news = await this.http.get(`/news`);
    },
    async fetchTracks() {
      this.tasks = await this.http.get(`/tracks`);
    },
    async lsFiles() {
      this.adminFiles = await this.http.get(
        "/files/list?fileType=ADMINISTRATIVE"
      );
    },
    async rmAdminFile(file) {
      await this.http.delete_(`/files/${file.filename}`, null);
      await this.lsFiles();
      this.recomputeConventionString();
    },
    async uploadFile(file) {
      await this.http.postForm("/files?fileType=ADMINISTRATIVE", {
        file,
      });
      await this.lsFiles();
      this.recomputeConventionString();
    },
    addFile() {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("hidden", true);
      document.body.appendChild(input);
      input.click();
      input.addEventListener("input", (e) => {
        let [file] = e.target.files;
        if (file) {
          this.uploadFile(file);
        }
      });
      // document.body.removeChild(input);
    },
    recomputeConventionString() {
      this.conventionString = "";
      const [last, ...notLast] = this.adminFiles
        .map((it) => [it.filename, it.originalFileName])
        .map(([id, it]) => [
          id,
          it.includes(".") ? it.substring(0, it.lastIndexOf(".")) : it,
        ])
        .map(
          ([id, it]) => `<a href="/api/files/${id}" target="_blank">${it}</a>`
        )
        .reverse();
      setTimeout(
        () =>
          (this.conventionString =
            `<p>Создавая учетную запись, вы соглашаетесь с ` +
            notLast.reverse().join(", ") +
            (notLast.length ? " и " : "") +
            last +
            "<p>"),
        100
      );
    },
  },
  mounted() {
    (async () => {
      const res = this.$root.settings;
      this.whitelistedEmails = res.whitelistedEmails.join("\n");
      this.waitlistText = res.waitListText;
      this.acceptanceText = res.acceptanceText;
      this.confirmationText = res.confirmationText;
      this.allowMinors = res.allowMinors;
      this.opens = this.transforms.dateFromServer(res.timeOpen, false, (m) =>
        m.format("yyyy-MM-DD")
      );
      this.closes = this.transforms.dateFromServer(res.timeClose, false, (m) =>
        m.format("yyyy-MM-DD")
      );
      this.confirmBy = this.transforms.dateFromServer(
        res.timeConfirm,
        false,
        (m) => m.format("yyyy-MM-DD")
      );
      this.uploadBy = this.transforms.dateFromServer(
        res.fileUploadDeadLine,
        false,
        (m) => m.format("yyyy-MM-DD")
      );
      this.show.onlineactivities = res.show.onlineActivitiesEnabled;
      this.show.checkpoint = res.show.checkPointEnabled;
      this.show.solution = res.show.solutionEnabled;
      this.show.acceptDeadline = res.show.showAcceptDeadlineEnabled;
      this.show.registrationDeadline = res.show.registrationDeadline;
      this.show.news = res.show.news;
      this.tou = res.tou;
      this.privacy = res.privacy;
      this.hackName = res.hackName;
      this.minTeamSize = res.minTeamSize;
      this.maxTeamSize = res.maxTeamSize;
      this.conventionString = res.conventionString;
      this.news = await this.http.get(`/news`);
      this.tasks = await this.http.get(`/tracks`);
      this.mailTemplates = await this.http.get("/email-templates");
      this.lsFiles();
    })();
  },
};
</script>

<style lang="scss">
.narrowBlock {
  width: 50%;
  display: inline-block !important;
}
.sm {
  .narrowBlock {
    width: unset;
    display: unset;
  }
}
.root-dark {
  .settingsRoot {
    textarea {
      background-color: rgb(23, 24, 34) !important;
    }
  }
}
</style>
