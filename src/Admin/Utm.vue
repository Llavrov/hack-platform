<template>
  <div class="pageContentContainer">
    <Xnavbar />
    <div class="horizPad">
      <div />
      <div class="utmRoot pageContentRoot">
        <div class="card">
          <div class="card-body" style="overflow-x: scroll">
            <div class="fr">
              <div style="width: 300px">
                <h2 style="margin-bottom: 0.8rem">Поиск</h2>
                <div class="fr">
                  <Xinput
                    style="width: 100%"
                    placeholder="Поиск..."
                    v-model="search.text"
                    @update:modelValue="updateShown()"
                  />
                  <div style="width: 1px; overflow: visible" class="fc">
                    <div class="f1" />
                    <unicon
                      name="search"
                      style="transform: translate(-40px)"
                      :fill="
                        $root.lightness === 'light' ? '#aaaaaa' : '#444444'
                      "
                    />
                    <div class="f1" />
                  </div>
                </div>
                <br />
                <Xselect
                  label="Показывать уровень вложенности"
                  id="levelSelect"
                  :options="[1, 2, 3, 4, 5]"
                  v-model="search.level"
                  @update:modelValue="updateShown()"
                />
                <div style="wifth: 1px; height: 10rem" />
              </div>
              <div style="width: 1rem" />
              <div class="f1">
                <div class="fr" style="margin-bottom: 0.8rem">
                  <h2>Utm</h2>
                  <div class="f1" />
                </div>
                <table class="adminTable">
                  <tbody>
                    <tr
                      v-for="it of tableView.filter((it) => it.show)"
                      :key="it.path.join('#')"
                      style="cursor: pointer"
                      @click="toggleDetailed(it)"
                    >
                      <td
                        :style="`transform:translate(${
                          (it.path.length - 1) * 2 +
                          (it.path.length === search.level ? 1 : 0)
                        }rem)`"
                      >
                        <template v-if="it.path.length < search.level">
                          <unicon
                            v-if="it.detailed === false"
                            name="angle-right"
                            size="1rem"
                            style="transform: scale(1.3)"
                          />
                          <unicon
                            v-else-if="it.detailed === true"
                            name="angle-down"
                            size="1rem"
                            style="transform: scale(1.3)"
                          />
                        </template>
                        <span>{{ it.path[it.path.length - 1] }}</span>
                      </td>
                      <td style="transform: translate(11rem)">
                        {{ it.count }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
              </div>
            </div>
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
  name: "Utm",
  data() {
    return {
      search: {
        text: null,
        level: 5,
      },
      tableView: [],
    };
  },
  computed: {},
  methods: {
    toggleDetailed(it) {
      if (it.detailed == null) {
        return;
      }
      let found = false;
      let depth = it.path.length;
      let item = null;
      for (let i = 0; i < this.tableView.length; ++i) {
        item = this.tableView[i];
        if (found) {
          if (item.path.length <= depth) {
            return;
          } else {
            item.show = it.detailed;
          }
        } else if (it === item) {
          found = true;
          it.detailed = !it.detailed;
        }
      }
    },
    pushRow(path, o, res) {
      if (!o.name?.length) {
        return;
      }
      const mewPath = [...path, o.name];
      res.push({
        path: mewPath,
        detailed: true,
        count: o.count,
        show: true,
      });
      if (o.nodes) {
        for (let it of o.nodes) {
          this.pushRow(mewPath, it, res);
        }
      }
    },
    async fetch() {
      const flatView = [];
      const res = await this.http.get("/utm");
      for (let it of res) {
        this.pushRow([], it, flatView);
      }
      this.tableView = flatView;
    },
    updateShown(o = { nodes: this.tableView }) {
      let mewShow = false;
      if (o.nodes) {
        for (let it of o.nodes) {
          this.updateShown(it);
          if (it.show) {
            mewShow = true;
          }
        }
      } else {
        if (!this.search.text?.length) {
          mewShow = true;
        } else {
          for (let it of o.path) {
            if (it.toLowerCase().includes(this.search.text.toLowerCase())) {
              mewShow = true;
              break;
            }
          }
        }
      }
      if (o.path.length > this.search.level) {
        mewShow = false;
      }
      o.show = mewShow;
    },
  },
  watch: {
    data(mew) {
      this.tableView = this.iter(mew);
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style lang="scss">
#levelSelect {
  .multiselect-clear {
    display: none;
  }
}
</style>