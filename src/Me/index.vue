<template>
  <div class="pageContentContainer">
    <Xmodal id="completedModal">
      <div style="text-align: center">
        <p
          v-text="
            'Круто! Ты заполнил(а) анкету! Следующий шаг - зарегистрировать команду или присоединиться к команде!'
          "
        />
        <p>
          <router-link
            to="/teams/2"
            class="lbtn2"
            v-text="'Если ты знаешь, к кому присоединиться:'"
            data-bs-target="#completedModal"
            data-bs-toggle="modal"
            @click="$router.push('/teams/2')"
          /><br />
          Попроси капитана скинуть тебе ссылку на приглашение или
          <b>создай команду</b>
        </p>
        <p>
          <router-link
            to="/teams/4"
            class="lbtn2"
            v-text="'Если ты еще ищешь сокомандников:'"
            data-bs-target="#completedModal"
            data-bs-toggle="modal"
            @click="$router.push('/teams/4')"
          /><br />
          <b>оставь карточку о себе</b> - тебя смогут найти и пригласить
        </p>
      </div>
    </Xmodal>
    <Xnavbar />
    <div class="horizPad">
      <div />
      <div class="meRoot pageContentRoot">
        <h1 class="pageHeader" v-t="'me.head'" />
        <XXitem num="1" :title="$t('me.1.head')" :s="state[1]">
          <form @submit.prevent="apply(1)" style="width: 100%">
            <div class="rowmd">
              <XXfield
                id="email"
                placeholder="example@gmail.com"
                disabled="t"
              />
              <XXfield
                id="phone"
                placeholder="+7 (___) ___-__-__"
                disabled="t"
              />
            </div>
            <div class="rowmd">
              <XXfield id="fname" placeholder="" />
              <XXfield id="lname" placeholder="" />
            </div>
            <div class="rowmd">
              <XXfield id="pname" placeholder="" />
              <div style="width: 100%" class="fr">
                <XXfield
                  t="date"
                  id="bdate"
                  required="t"
                  placeholder="ДД.ММ.ГГГГ"
                  style="flex-basis: 50%"
                />
                <div
                  v-if="$root.size === 'lg'"
                  style="margin-left: 15px; flex-basis: 50%"
                  class="fc"
                >
                  <div class="f1" />
                  <XXfield
                    t="radio"
                    required="t"
                    id="sex"
                    style="width: 110%; overflow: visible"
                  />
                  <div class="f1" />
                </div>
              </div>
            </div>
            <div v-if="$root.size !== 'lg'" class="onlyRadioContainer">
              <XXfield t="radio" id="sex" style="width: 100%" />
            </div>
            <div class="rowlg">
              <XXfield t="select" id="country" required="t" :addOpts="true" />
              <XXfield
                t="select"
                id="region"
                required="t"
                v-if="model.country === 'Россия'"
                :addOpts="true"
              />
              <XXfield id="region" required="t" v-else />
            </div>
            <div class="rowlg">
              <!--              <XXfield t="select" id="city" />-->
              <XXfield id="city" required="t" />
              <XXfield
                id="myContact"
                class="tgInContainer"
                palceholder="Link"
                required="t"
              />
            </div>
            <button
              class="btn btn-primary btnLg btnSubmit"
              v-t="'me.1.action'"
            />
          </form>
        </XXitem>
        <XXitem num="2" :title="$t('me.2.head')" :s="state[2]">
          <form @submit.prevent="apply(2)" style="width: 100%">
            <div class="rowlg">
              <XXfield id="heo" placeholder="Университет / школа" />
              <XXfield id="division" placeholder="Компьютерные науки" />
            </div>
            <div class="rowlg">
              <XXfield id="gradYear" placeholder="2018" />
              <XXfield id="acadDeg" t="select" />
            </div>
            <button
              class="btn btn-primary btnLg btnSubmit"
              v-t="'me.2.action'"
            />
          </form>
        </XXitem>
        <XXitem num="3" :title="$t('me.3.head')" :s="state[3]">
          <form @submit.prevent="apply(3)" style="width: 100%">
            <div class="rowlg">
              <XXfield id="position" placeholder="Дизайнер, разработчик" />
              <XXfield id="jobType" t="select" />
            </div>
            <div class="rowlg">
              <XXfield id="jobPlace" placeholder="OOO" />
              <XXfield id="jobLen" />
            </div>
            <div class="rowlg">
              <XXfield id="resume" label="Портфолио/резюме" />
              <XXfield id="linkedIn" placeholder="Link" />
            </div>
            <button
              class="btn btn-primary btnLg btnSubmit"
              v-t="'me.3.action'"
            />
          </form>
        </XXitem>
        <XXitem num="4" :title="$t('me.4.head')" :s="state[4]">
          <form @submit.prevent="apply(4)" style="width: 100%">
            <div class="rowlg">
              <XXfield
                id="infoSrc"
                t="select"
                :label="`Откуда ты узнал(а) о ${$root.settings.hackName}`"
              />
              <XXfield id="task" t="select" required="t" />
            </div>
            <div style="max-width: 40em" class="onlyRadioContainer">
              <XXfield id="l4Work" t="radio" />
            </div>
            <div>
              <XXfield
                t="text"
                id="participationReason"
                placeholder="Описание"
                :label="`Почему ты хочешь участвовать в ${$root.settings.hackName}, и почему мы должны тебя выбрать?`"
              />
            </div>
            <div>
              <XXfield t="text" id="freeFromInfo" placeholder="Описание" />
            </div>
            <button
              class="btn btn-primary btnLg btnSubmit"
              v-t="'me.4.action'"
            />
          </form>
        </XXitem>
      </div>
      <div />
    </div>
    <Xfooter />
  </div>
</template>

<script>
import XXitem from "./Item";
import XXfield from "./Field";
import { countries, regions } from "../countries";
export default {
  name: "Me",
  components: {
    XXitem,
    XXfield,
  },
  data() {
    return {
      model: {},
      resume: false,
      options: {
        sex: [
          { id: "MALE", label: "Мужской" },
          { id: "FEMALE", label: "Женский" },
        ],
        country: [{ id: null, label: this.$t("g.notChosen") }, ...countries],
        region: [{ id: null, label: this.$t("g.notChosen") }, ...regions],
        acadDeg: [
          { id: null, label: this.$t("g.notChosen") },
          { id: "1", label: "Бакалавр" },
          { id: "2", label: "Магистр" },
          { id: "3", label: "Специалист" },
          { id: "4", label: "Неоконченное высшее" },
          { id: "5", label: "Нет" },
          { id: "6", label: "Другое" },
        ],
        jobType: [
          { id: null, label: this.$t("g.notChosen") },
          { id: "FULL_TIME", label: "Полная занятость" },
          { id: "PART_TIME", label: "Частичная занятость" },
          { id: "INDIVIDUAL_ENTREPRENEUR", label: "ИП" },
        ],
        infoSrc: [
          { id: null, label: this.$t("g.notChosen") },
          { id: "FRIENDS", label: "От друзей" },
          { id: "SNS", label: "В социальных сетях" },
          { id: "ADVERTISING", label: "Из рекламы" },
          { id: "JOB", label: "На работе" },
        ],
        task: [
          { id: null, label: this.$t("g.notChosen") },
          ...(this.$root.tasks || []).map((it) => ({
            id: it.id,
            label: it.trackName,
          })),
        ],
        l4Work: [
          { id: null, label: this.$t("g.notChosen") },
          { id: "true", label: "Да" },
          { id: "false", label: "Нет" },
        ],
      },
      completed: [],
      showErrors: {
        1: false,
        2: false,
        3: false,
        4: false,
      },
    };
  },
  computed: {
    state() {
      const s = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      };
      let sub = Number(this.$route.params.pathMatch[0]);
      let st = 2;
      for (let i = 1; i <= 4; ++i) {
        if (sub === i) {
          s[i] = 1;
          st = this.$root.user?.status?.completedProfile ? 2 : 0;
        } else {
          s[i] = st;
        }
      }
      return s;
    },
    errors() {
      const model = this.model;
      const s = { 1: false, 2: false, 3: false, 4: false };
      if (!(model.bdate && String(model.bdate)?.length)) {
        s[1] = true;
      }
      if (!(model.country && String(model.country)?.length)) {
        s[1] = true;
      }
      if (!(model.region && String(model.region)?.length)) {
        s[1] = true;
      }
      if (!(model.city && String(model.city)?.length)) {
        s[1] = true;
      }
      if (!(model.myContact && String(model.myContact)?.length)) {
        s[1] = true;
      }
      if (!(model.task && String(model.task)?.length)) {
        s[4] = true;
      }
      return s;
    },
  },
  methods: {
    async apply(n) {
      if (this.errors[n]) {
        this.showErrors[n] = true;
        return;
      } else {
        this.showErrors[n] = false;
      }
      await this.http.put(
        "/users/" + this.$root.user.id + "/profile",
        this.modelToDto()
      );
      if (String(n) === "4") {
        if (!this.$root.user?.status?.completedProfile) {
          await this.http.put("/users/" + this.$root.user.id + "/status", {
            completedProfile: true,
          });
        }
      }
      await this.$root.updateUser();
      if (+n < 4) {
        this.$router.push(`/me/${+n + 1}`);
      } else {
        this.$root.showModal("completedModal");
        // this.$router.push("/todo");
      }
    },
    modelFromDto(res, model = this.model) {
      const profile = res.profile;
      model.email = res.email;
      model.phone = profile?.phoneNumber;
      model.fname = profile?.firstName;
      model.lname = profile?.surname;
      model.pname = profile?.patronymic;
      model.bdate = profile?.birthday;
      model.sex = profile?.gender || null;
      model.country = profile?.country;
      model.region = profile?.state;
      model.city = profile?.city;
      model.myContact = profile?.contacts;
      model.heo = profile?.university;
      model.gradYear = profile?.graduationYear;
      model.acadDeg = profile?.major;
      model.division = profile?.division;
      model.position = profile?.workPosition;
      model.jobType = profile?.employmentForm;
      model.jobPlace = profile?.companyName;
      model.jobLen = profile?.experienceYears;
      this.resume = res?.resume?.filename;
      model.linkedIn = profile?.linkedin;
      model.infoSrc = profile?.whereDidYouFindOut;
      model.task = profile?.preferredTask;
      model.l4Work = profile?.l4Work;
      model.participationReason = profile?.participationReason;
      model.freeFromInfo = profile?.somethingInteresting;
      return model;
    },
    modelToDto(model = this.model, dto = null) {
      dto = dto || {};
      dto.phoneNumber = model.phone;
      dto.firstName = model.fname;
      dto.surname = model.lname;
      dto.patronymic = model.pname;
      dto.birthday = model.bdate;
      dto.gender = model.sex;
      dto.country = model.country;
      dto.state = model.region;
      dto.city = model.city;
      dto.contacts = model.myContact;
      dto.university = model.heo;
      dto.major = model.acadDeg;
      dto.graduationYear = model.gradYear;
      dto.division = model.division;
      dto.workPosition = model.position;
      dto.employmentForm = model.jobType;
      dto.companyName = model.jobPlace;
      dto.experienceYears = model.jobLen;
      // dto.resume = model.resume;
      dto.linkedin = model.linkedIn;
      dto.whereDidYouFindOut = model.infoSrc;
      dto.preferredTask = model.task;
      dto.l4Work = model.l4Work;
      dto.participationReason = model.participationReason;
      dto.somethingInteresting = model.freeFromInfo;
      return dto;
    },
    mbRedirect() {
      let sub = Number(this.$route.params.pathMatch[0]);
      if ([1, 2, 3, 4].includes(sub)) {
        return;
      }
      sub = 1;
      const model = this.model;
      function chkFld(fld, tab) {
        if (model[fld] && String(model[fld]).length) {
          sub = tab + 1;
        }
      }
      chkFld("fname", 1);
      chkFld("lname", 1);
      chkFld("pname", 1);
      chkFld("bdate", 1);
      chkFld("country", 1);
      chkFld("region", 1);
      chkFld("city", 1);
      chkFld("myContact", 1);
      chkFld("heo", 2);
      chkFld("division", 2);
      chkFld("gradYear", 2);
      chkFld("acadDeg", 2);
      chkFld("position", 3);
      chkFld("jobType", 3);
      chkFld("jobPlace", 3);
      chkFld("jobLen", 3);
      if (this.resume) {
        sub = 4;
      }
      chkFld("linkedIn", 3);
      chkFld("infoSrc", 4);
      chkFld("task", 4);
      chkFld("l4Work", 4);
      chkFld("participationReason", 4);
      chkFld("freeFromInfo", 4);
      if (sub === 5) {
        sub = 1;
      }
      this.$router.replace(`/me/${sub}`);
    },
  },
  mounted() {
    (async () => {
      const res = await this.http.get("/users/" + this.$root.user.id);
      this.modelFromDto(res);
      window.model = this.model;
      this.mbRedirect();
    })();
  },
};
</script>

<style lang="scss">
.meRoot {
  .pageHeader {
    margin-bottom: 38px;
  }
  .badged {
    flex-direction: row-reverse;
    .tgBadge {
      margin-top: 25px;
      z-index: 100;
      width: 80px;
      color: var(--clr) !important;
      background: scale-color(#59d9ba, $lightness: 30%) !important;
      margin-bottom: 27px;
    }
    .tgInContainer input {
      transform: translateX(-20px);
      padding-left: 35px !important;
    }
  }
}
.root-dark .meRoot {
  .badged .tgBadge {
    background: scale-color(#59d9ba, $lightness: -30%) !important;
  }
}
.md .meRoot {
  .pageHeader {
    margin-bottom: 54px;
  }
}
.sm .meRoot {
  .pageHeader {
    margin-bottom: 32px;
  }
  .btnSubmit {
    width: 100% !important;
  }
}

.meItemRoot {
  form {
    background: var(--bgclr);
    padding: 27px 33px 39px 28px;
    .xInRoot,
    .xSelRoot,
    .onlyRadioContainer {
      margin-bottom: 26px;
    }
  }
}
.lg .meRoot .rowlg {
  display: flex;
  flex-direction: row;
  > div:nth-child(2) {
    margin-left: Max(0.5vw, 40px);
  }
}
.lg .meRoot .rowmd,
.md .meRoot .rowmd {
  display: flex;
  flex-direction: row;
  > div:nth-child(2) {
    margin-left: Max(0.5vw, 40px);
  }
}
.dark-root {
  .tgBadge > input {
    background: scale-color(#59d9ba, $lightness: -30%) !important;
  }
}
</style>
