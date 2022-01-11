import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import {
  fmtDate,
  parseDate,
  mapObj,
  mkReverseMapper,
  mkId,
  transforms,
  validators,
} from "./utils";
import * as http from "./http";
import i18n from "./translation";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import Datepicker from "vue3-datepicker";
import Unicon from "vue-unicons";
import {
  uniSun,
  uniMoon,
  uniCheckCircle,
  uniTimesCircle,
  uniSearch,
  uniDownloadAlt,
  uniCheck,
  uniTimes,
  uniAngleRight,
  uniAngleDown,
  uniPlus,
  uniUploadAlt,
  uniQuestionCircle,
} from "vue-unicons/dist/icons";
Unicon.add([
  uniSun,
  uniMoon,
  uniCheckCircle,
  uniTimesCircle,
  uniSearch,
  uniDownloadAlt,
  uniCheck,
  uniTimes,
  uniAngleRight,
  uniAngleDown,
  uniPlus,
  uniUploadAlt,
  uniQuestionCircle,
]);

import Xnavbar from "./_/Navbar";
import Xfooter from "./_/Footer";
import Xmodal from "./_/Modal";
import Xcenter from "./_/Center";
import Xinput from "./_/Input";
import XfileInput from "./_/FileInput";
import Xselect from "./_/Select";
import Xradio from "./_/Radio";
import XorLined from "./_/OrLined";
import XTFQ from "./_/TFQ";
import XAngleRight from "./_/AngleRight";
import Xpagination from "./_/Pagination";
import Multiselect from "@vueform/multiselect";

import Home from "./Home";
import Register from "./Register";
import Recover from "./Recover";
import LogIn from "./LogIn";
import Me from "./Me";
import ToDo from "./ToDo";
import News from "./News";
import Solution from "./Solution";
import Activities from "./Activities";
import ParticipateVerify from "./ParticipateVerify";
import JoinTeam from "./JoinTeam";
import AdminStats from "./Admin/Stats";
import AdminTeams from "./Admin/Teams";
import AdminSettings from "./Admin/Settings";
import AdminUsers from "./Admin/Users";
import AdminUtm from "./Admin/Utm";
import Team from "./Team";
import Render from "./Render";
import P404 from "./P404";

(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    const medium = params.get("utm_medium");
    const campaign = params.get("utm_campaign");
    const content = params.get("utm_content");
    const term = params.get("utm_term");
    if (source && medium && campaign) {
      await http.post("/utm", { source, medium, campaign, content, term });
      window.location = window.location.href.replace(/utm_[^&]+/, "");
    }
  } catch (e) {
    console.warn(e);
  }
  if (window.location.pathname.startsWith("/verification/")) {
    const res = await http.post(
      "/auth/verify/" +
        window.location.pathname.substring("/verification/".length)
    );
    window.localStorage.setItem("t", res.accessToken);
    window.localStorage.setItem("r", res.refreshToken);
    window.location.path = "/";
  }

  const app = createApp(App);

  app.component("Xnavbar", Xnavbar);
  app.component("Xfooter", Xfooter);
  app.component("Xmodal", Xmodal);
  app.component("Xcenter", Xcenter);
  app.component("Xinput", Xinput);
  app.component("XfileInput", XfileInput);
  app.component("Xselect", Xselect);
  app.component("Xradio", Xradio);
  app.component("XorLined", XorLined);
  app.component("XTFQ", XTFQ);
  app.component("XAngleRight", XAngleRight);
  app.component("Xpagination", Xpagination);
  app.component("Multiselect", Multiselect);
  app.component("Quill", QuillEditor);
  app.component("Datepicker", Datepicker);

  app.config.globalProperties.llog = console.log;
  app.config.globalProperties.$bs = bootstrap;
  app.config.globalProperties.toClipboard = function (txt) {
    navigator.clipboard.writeText(txt);
    window.root.spawnToast("Скопировано");
  };
  app.config.globalProperties.toClipboard2 = function (id) {
    const el = document.getElementById(id);
    el.focus();
    el.setSelectionRange(0, 99999);
    document.execCommand("copy");
    window.root.spawnToast("Скопировано");
  };
  app.config.globalProperties.fmtDate = fmtDate;
  app.config.globalProperties.parseDate = parseDate;
  app.config.globalProperties.mapObj = mapObj;
  app.config.globalProperties.mkReverseMapper = mkReverseMapper;
  app.config.globalProperties.http = http;
  app.config.globalProperties.mkId = mkId;
  app.config.globalProperties.transforms = transforms;
  app.config.globalProperties.validators = validators;
  app.config.globalProperties.memberRoles = [
    { id: "LEAD", label: "Капитан" },
    { id: "FRONT", label: "Фронтэнд" },
    { id: "BACK", label: "Бэкэнд" },
    { id: "MOBILE", label: "Мобильный" },
    { id: "DS", label: "Датасаентист" },
    { id: "DESIGNER", label: "Дизайнер" },
    { id: "EXPERT", label: "Эксперт" },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", name: "/", component: Home },
      { path: "/register", name: "/register", component: Register },
      { path: "/recover", name: "/recover", component: Recover },
      { path: "/logIn", name: "/logIn", component: LogIn },
      { path: "/me/:pathMatch(.*)*", name: "/me", component: Me },
      { path: "/todo", name: "/todo", component: ToDo },
      { path: "/news", name: "/news", component: News },
      { path: "/solution", name: "/solution", component: Solution },
      { path: "/activities", name: "/activities", component: Activities },
      { path: "/admin/stats", name: "/admin/stats", component: AdminStats },
      { path: "/admin/teams", name: "/admin/teams", component: AdminTeams },
      { path: "/admin/utm", name: "/admin/utm", component: AdminUtm },
      { path: "/joinTeam", name: "/joinTeam", component: JoinTeam },
      {
        path: "/admin/config",
        name: "/admin/config",
        component: AdminSettings,
      },
      {
        path: "/admin/usermgmt",
        name: "/admin/usermgmt",
        component: AdminUsers,
      },
      {
        path: "/participateVerify",
        name: "/participateVerify",
        component: ParticipateVerify,
      },
      {
        path: "/teams/:pathMatch(.*)*",
        name: "/teams",
        component: Team,
      },
      {
        path: "/tou",
        name: "/tou",
        component: Render,
      },
      {
        path: "/privacy",
        name: "/privacy",
        component: Render,
      },
      {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: P404,
      },
    ],
  });
  app.use(i18n);
  app.use(router);
  app.use(Unicon);
  app.mount("#app");
})();
