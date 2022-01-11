import Moment from "moment";

function insertText(s, pos, insert) {
  if (s.length > pos) {
    return s.substring(0, pos) + insert + s.substring(pos);
  }
  return s;
}

export function fmtDate(d) {
  console.log("fmt", d);
  let m;
  if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}.*/.test(d)) {
    m = Moment(
      d.substring(0, 10) + " " + d.substring(11, 16) + "Z",
      "YYYY-MM-DD HH:mmZ"
    );
  } else if (/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}T.*/.test(d)) {
    m = Moment(d, "yyyy-MM-DD HH:mm:ssTZZ");
  } else {
    m = Moment(d);
  }
  return m.format("DD.MM.YYYY, HH:mm Z");
}
export function parseDate(d) {
  Moment(d).toDate();
}

export function mkReverseMapper(map) {
  const reverse = {};
  for (let it of Object.getOwnPropertyNames(map)) {
    if (typeof map[it] === "string") {
      reverse[map[it]] = it;
    }
  }
  return reverse;
}

export function mapObj(mapper, src, tgt, copyMissing) {
  tgt = tgt || {};
  let mapping;
  if (Array.isArray(mapper)) {
    for (let it of mapper) {
      tgt[it] = src[it];
    }
    return;
  }
  for (let it of Object.getOwnPropertyNames(src)) {
    mapping = mapper[it];
    if (typeof mapping === "string") {
      tgt[mapping] = src[it];
    } else if (mapping?.name) {
      tgt[mapping.name] = mapping.f(src[it]);
    } else if (typeof mapping === "function") {
      tgt[it] = mapping(src[it]);
    } else if (!mapping && copyMissing) {
      tgt[it] = src[it];
    }
  }
  return tgt;
}

let id = 0;
export function mkId(prefix) {
  return (prefix || "") + ++id;
}

export const validators = {
  email(mew) {
    if (!mew.includes("@")) {
      return "Не является правильным email-адресом";
    }
  },
};

export const transforms = {
  phone(mew) {
    if (!mew?.length) {
      return "";
    }
    let it = "+" + mew.replace(/\D/g, "");
    let ccEnds = it.length <= 12 ? 1 : it.length <= 13 ? 2 : 3;
    it = insertText(it, ccEnds + 1, " (");
    it = insertText(it, ccEnds + 6, ") ");
    it = insertText(it, ccEnds + 11, "-");
    it = insertText(it, ccEnds + 14, "-");
    return it.substring(0, ccEnds + 17);
  },
  dateToServer(v, dateOnly, f) {
    if (v == null) {
      return null;
    }
    const res = Moment(v).format(
      !dateOnly ? "yyyy-MM-DD HH:mm:ssTZZ" : "yyyy-MM-DDTZZ"
    );
    return f ? f(res) : res;
  },
  dateFromServer(v, dateOnly, f) {
    if (v == null) {
      return null;
    }
    const res = Moment(
      v,
      !dateOnly ? "yyyy-MM-DD HH:mm:ssTZZ" : "yyyy-MM-DDTZZ"
    );
    return f ? f(res) : res;
  },
};

export function fileToBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.readAsDataURL(file);
    r.onload = () => res(r.result);
    r.onerror = (e) => rej(e);
  });
}

export function sleep(t) {
  return new Promise((r) => setTimeout(r, t));
}
