'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            'courses',
            [
                {
                    name: 'Khóa học C++ căn bản',
                    description:
                        'Dành cho học viên bắt đầu tiếp cận với lập trình',
                    categoryId: 1,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1637942350/courses/qabh0ih5xcywmjqaw8vh.jpg courses/qabh0ih5xcywmjqaw8vh',
                },
                {
                    name: 'Khóa học C++ nâng cao',
                    description: 'Khóa học tiếp theo của khóa C++ căn bản',
                    categoryId: 2,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1637942365/courses/zqnillptfnvrqsht5wan.jpg courses/zqnillptfnvrqsht5wan',
                },
                {
                    name: 'Khóa học Web căn bản (HTML - CSS - Javascript)',
                    description:
                        'Dành cho những học viên có đam mê lập trình web',
                    categoryId: 3,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639155388/courses/rgthp2ykumyyyfq4q6tx.jpg courses/rgthp2ykumyyyfq4q6tx',
                },
                {
                    name: 'Khóa học Front-end căn bản (ReactJS - Bootstrap)',
                    description:
                        'Khóa học tiếp theo của khóa Web căn bản, dành cho các bạn theo thiên hướng Front-end',
                    categoryId: 3,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1637942622/courses/csetvbz8bxpzzlkpy9nx.png courses/csetvbz8bxpzzlkpy9nx',
                },
                {
                    name: 'Khóa học Back-end căn bản (NodeJS - MySQL)',
                    description:
                        'Khóa học tiếp theo của khóa Web căn bản, dành cho các bạn theo thiên hướng Back-end',
                    categoryId: 3,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639155399/courses/gsbhupxwpafhsi3sbiqa.jpg courses/gsbhupxwpafhsi3sbiqa',
                },
                {
                    name: 'Khóa học Web Full-stack',
                    description:
                        'Khóa học cho các học viên đã học xong hai khóa Front-end và Back-end, muốn tạo cho mình một dự án riêng',
                    categoryId: 3,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1637942672/courses/jpjdpc9ui2tu35cjet71.png courses/jpjdpc9ui2tu35cjet71',
                },
                {
                    name: 'Khóa học Lập trình Hướng đối tượng (Java)',
                    description:
                        'Khóa học cho các bạn muốn tìm hiểu thêm về OOP',
                    categoryId: 3,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1637942746/courses/o55oms4bthat8wugtip1.jpg courses/o55oms4bthat8wugtip1',
                },
                {
                    name: 'Cấu trúc dữ liệu và giải thuật (C++)',
                    description:
                        'Giúp các bạn hiểu rõ hơn về các thuật toán và cấu trúc dữ liệu cơ bản',
                    categoryId: 3,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1637942841/courses/fbhwewswidmiovdqq2pc.jpg courses/fbhwewswidmiovdqq2pc',
                },
            ],
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
