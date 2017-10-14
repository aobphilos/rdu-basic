$(function () {

  var videoList = [{
      id: "o64T7Cac7ts",
      desc: "สภาวะปัจจุบันของระบบสุขภาพกับการใช้ยาของผู้ป่วย"
    },
    {
      id: "RT3FCFIQipg",
      desc: "ข้อปฏิบัติตัวเมื่อผู้ป่วยมารับยาจากเภสัชกร"
    },
    {
      id: "uRVnCHXI0ig",
      desc: "รู้จักยา และอาการไม่พึงประสงค์"
    },
    {
      id: "lSev1owleLs",
      desc: "ใช้ยาอย่างไรให้ถูกวิธี และการเก็บรักษายา"
    },
    {
      id: "Nc1uDNiDC5U",
      desc: "ปัญหาจากการใช้ยา"
    },
    {
      id: "l3UWnvaTxNc",
      desc: "การแพ้ยา และอาการแพ้ยา"
    },
    {
      id: "QhbDSeKM5Z0",
      desc: "การใช้ยาปฏิชีวนะในโรคหวัด"
    },
    {
      id: "kzyagJYHMwk",
      desc: "การใช้ยาสำหรับแผลเลือดออก"
    },
    {
      id: "LSbtg3JrTKM",
      desc: "โรคท้องเสียจำเป็นต้องกินยาปฏิชีวนะ หรือไม่?"
    }
  ];

  var $content = $("#video").find("article");
  if ($content.length === 1) {
    var seg1 = '<div class="row"><div class="7u 12u$(small)"><iframe width="100%" height="320" src="https://www.youtube.com/embed/';
    var seg2 = '?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe></div><div class="5u$ 12u$(small)"><label>';
    var seg3 = '</label></div></div>';
    var line = '<hr class="major" >';
    var list = [];
    videoList.forEach(function (item) {
      list.push([seg1, item.id, seg2, item.desc, seg3].join(''));
    });
    $content.append(list.join(line));
  }

});
