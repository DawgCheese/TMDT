import React from 'react';
import PageHeader from "../components/PageHeader";

const services = [
  {
    title: "Thiết kế bánh theo yêu cầu",
    desc: "Tại đây chúng tôi có thể hỗ trợ bạn thiết kế những chiếc bánh theo yêu cầu của bạn. Bạn có thể tùy chỉnh hương vị, màu sắc, kích thước theo sở thích của mình...",
    image: "/src/assets/img/vechungtoi1.png",
  },
  {
    title: "Quà tặng cho bạn",
    desc: "Tại đây, chúng tôi có thể tặng kèm cho bạn những món quà, mỗi khi bạn đặt bánh hoặc vào dịp lễ...",
    image: "/src/assets/img/vechungtoi2.png",
  },
  {
    title: "Tri ân khách hàng",
    desc: "Để tri ân khách hàng thân thiết đã ủng hộ Cupakery thì chúng tôi sẽ tổ chức rút thăm trúng thưởng, tặng quà và có những phần quà giá trị hấp dẫn dành cho bạn.",
    image: "/src/assets/img/vechungtoi3.png",
  },
  {
    title: "Giao bánh tận nơi",
    desc: "Chúng tôi sẽ hỗ trợ bạn khi bạn đặt bánh từ Cupakery, chúng tôi có thể giao hàng cho bạn một cách nhanh chóng. Ngoài ra ở Cupakery có thể cho chọn hình thức giao bánh.",
    image: "/src/assets/img/vechungtoi4.png",
  },
];

const ServicePage = () => {
  return (
    <section className="bg-[#fdfbf7] pb-20">
      {/* Header Section */}
      <PageHeader
          subTitle="Services"
          title="Dịch vụ cung cấp"
          breadcrumb="dich-vu"
        />

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Dịch Vụ</h2>
          <p className="text-gray-600">
            Tại Cupakery, chúng tôi không chỉ mang đến những chiếc bánh thơm ngon mà còn cung cấp các dịch vụ đặc biệt giúp bạn có trải nghiệm trọn vẹn nhất.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div key={index} className="flex items-start gap-6">
              <img
                src={service.image}
                alt={service.title}
                className="w-62 h-62 object-contain"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
