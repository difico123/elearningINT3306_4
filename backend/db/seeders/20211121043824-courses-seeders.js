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
                    name: 'Khóa học Web căn bản (HTML - CSS - Javascript)',
                    description:
                        'Dành cho những học viên có đam mê lập trình web',
                    categoryId: 3,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639155388/courses/rgthp2ykumyyyfq4q6tx.jpg courses/rgthp2ykumyyyfq4q6tx',
                    verified: 1,
                },
                {
                    name: 'Khóa học Front-end căn bản (ReactJS - Bootstrap)',
                    description:
                        'Khóa học tiếp theo của khóa Web căn bản, dành cho các bạn theo thiên hướng Front-end',
                    categoryId: 3,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1637942622/courses/csetvbz8bxpzzlkpy9nx.png courses/csetvbz8bxpzzlkpy9nx',
                    verified: 1,
                },
                {
                    name: 'Khóa học Back-end căn bản (NodeJS - MySQL)',
                    description:
                        'Khóa học tiếp theo của khóa Web căn bản, dành cho các bạn theo thiên hướng Back-end',
                    categoryId: 3,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639155399/courses/gsbhupxwpafhsi3sbiqa.jpg courses/gsbhupxwpafhsi3sbiqa',
                    verified: 1,
                },
                {
                    name: 'Khóa học Web Full-stack',
                    description:
                        'Khóa học cho các học viên đã học xong hai khóa Front-end và Back-end, muốn tạo cho mình một dự án riêng',
                    categoryId: 3,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1637942672/courses/jpjdpc9ui2tu35cjet71.png courses/jpjdpc9ui2tu35cjet71',
                    verified: 1,
                },
                {
                    name: 'Khóa học Lập trình Hướng đối tượng (Java)',
                    description:
                        'Khóa học cho các bạn muốn tìm hiểu thêm về OOP',
                    categoryId: 3,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1637942746/courses/o55oms4bthat8wugtip1.jpg courses/o55oms4bthat8wugtip1',
                    verified: 1,
                },
                {
                    name: 'Cấu trúc dữ liệu và giải thuật (C++)',
                    description:
                        'Giúp các bạn hiểu rõ hơn về các thuật toán và cấu trúc dữ liệu cơ bản',
                    categoryId: 3,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1637942841/courses/fbhwewswidmiovdqq2pc.jpg courses/fbhwewswidmiovdqq2pc',
                    verified: 1,
                },
                {
                    name: 'Kỹ năng sale: Trở thành chiên da chốt đơn trong vỏn vẹn 3 ngày',
                    description:
                        'Làm chủ ngành sale: Thuần thục những chiến lược cơ bản để chốt đơn với nhiều khách hàng tiềm năng hơn',
                    categoryId: 6,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639401456/courses/sha14782tzrqimg9gfey.jpg courses/sha14782tzrqimg9gfey',
                    verified: 1,
                },
                {
                    name: 'Buôn bán như chuyên gia',
                    description:
                        'Khóa học đầu tay của tiến sĩ Nông Lương Đức, những nghiên cứu trong khóa học đã giúp rất nhiều học viên trở thành chiên da buôn bán.',
                    categoryId: 6,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639401557/courses/fpghpkaq9kimvm6no4bc.jpg courses/fpghpkaq9kimvm6no4bc',
                    verified: 1,
                },
                {
                    name: 'How to Sell Anything to Anyone',
                    description:
                        'Ethically Proven Persuasion Techniques, Sales Systems, Effective Negotiations & Pitches, All Backed By Years of Science',
                    categoryId: 6,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639401605/courses/kwxmz80tvpccsddimmal.jpg courses/kwxmz80tvpccsddimmal',
                    verified: 1,
                },
                {
                    name: 'Fundamentals of Real Customer Success',
                    description:
                        'Ensure your customers stay longer, buy more, and advocate for you by helping them achieve their desired outcome.',
                    categoryId: 6,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639401653/courses/vfuqnre7khxsxk4k43y7.jpg courses/vfuqnre7khxsxk4k43y7',
                    verified: 1,
                },
                {
                    name: 'Sales Skills Mastery 1: Sales Training For Beginners',
                    description:
                        'Selling Techniques and Sales Strategy that Every Salesperson Ought to Know - Sales Training For the Modern World',
                    categoryId: 6,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639401678/courses/v3wiufcbyodyqjyupcqi.jpg courses/v3wiufcbyodyqjyupcqi',
                    verified: 1,
                },
                {
                    name: 'Chiến lược kinh doanh online',
                    description:
                        'Cách tiếp cận mảng bán hàng online dành cho những ai thất nghiệp mùa dịch mà muốn có thêm thu nhập. Gọi ngay Zalo 0915181042 để biết thêm thông tin chi tiết!',
                    categoryId: 6,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639401748/courses/tyb8j3erktt8ladoyukl.jpg courses/tyb8j3erktt8ladoyukl',
                    verified: 1,
                },
                {
                    name: 'Chiến lược kinh doanh bất động sản',
                    description:
                        'Bạn muốn trở thành nhà đầu tư bất động sản mà chưa có vốn? Đừng lo, ở đây chúng tôi cho vay! Giải Ngân Nhanh Chóng. Xét Duyệt Hồ Sơ Chỉ Trong 3 Ngày. Ân Hạn Nợ Gốc 3 Kỳ Đầu. Tư Vấn Làm Thủ Tục Miễn Phí. Vay Tiền Online 24/7. Không Cần Thế Chấp. Thủ Tục Dễ',
                    categoryId: 6,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639401869/courses/bevuwtxxthjthdtbmscy.jpg courses/bevuwtxxthjthdtbmscy',
                    verified: 1,
                },
                {
                    name: 'Khóa học cho thuê giàn giáo',
                    description:
                        'Thiên Phú cung cấp bán và cho thuê giàn giáo ở những khu vực nào? — Kiểm tra và vệ sinh sản phẩm, in logo lên giàn giáo theo yêu cầu của khách hàng để tiện ...',
                    categoryId: 6,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639402174/courses/xzzopsj7j8wec3apo0ja.jpg courses/xzzopsj7j8wec3apo0ja',
                    verified: 1,
                },
                {
                    name: 'Ngưng bình thường với kỹ năng tư duy sáng tạo',
                    description:
                        'Đây là một lớp học online rất chất lượng từ hành trang sống giúp bạn vượt qua rào cản, rèn luyện, thuyết trình kỹ năng tư duy sáng tạo trong học tập, kinh doanh và giải quyết vấn đề, cung cấp sơ đồ hình cây phù hợp để dạy cho trẻ mầm non và của sinh viên.',
                    categoryId: 4,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639402672/courses/yvrxxzulo6d8mkr0rajc.jpg courses/yvrxxzulo6d8mkr0rajc',
                    verified: 1,
                },
                {
                    name: 'Sáng tạo và kỹ năng giải quyết vấn đề',
                    description:
                        'Master the skills and tools that will allow you to drive innovation, create alternatives and generate solutions',
                    categoryId: 4,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639402767/courses/aw2mlnfyhh6clqpzv9oj.jpg courses/aw2mlnfyhh6clqpzv9oj',
                    verified: 1,
                },
                {
                    name: 'Học cách trở thành tể tướng sáng tạo',
                    description:
                        'Dưới sự dẫn dắt của giáo sư tiến sĩ với rất nhiều nghiên cứu khoa học, bạn sẽ từng bước trở thành một lãnh chúa sáng tạo, đồ tể phát minh, ông hoàng sáng kiến mà bạn chưa từng nghĩ bạn có thể làm được.',
                    categoryId: 4,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639403055/courses/kfcseuu19qrucdlzwmxs.jpg courses/kfcseuu19qrucdlzwmxs',
                    verified: 1,
                },
                {
                    name: 'Tư duy sáng tạo - đột phá',
                    description:
                        'Mang đến nhận thức đúng đắn về tư duy tầm quan trọng của kỹ năng này.\n Vận dụng các phương pháp, cách thức hoạt động và kỹ năng tư duy.\n Nắm vững các nguyên tắc tư duy sáng tạo.',
                    categoryId: 6,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639402672/courses/yvrxxzulo6d8mkr0rajc.jpg courses/yvrxxzulo6d8mkr0rajc',
                    verified: 1,
                },
                {
                    name: 'Bí kíp khiến viết thơ không bị ngang',
                    description:
                        'Bạn hay bí từ khi viết thơ? Nghĩ ra vần rất hay nhưng không biết diễn đạt kiểu gì? Vậy hãy đến với chúng tôi, nơi mà các bạn có thể học lỏm được kha khá thứ từ rapper Vanh Nguyễn. Chỉ vỏn vẹn 2 năm thôi mà anh ấy đã trở thành rapper số 1 khu vực Cầu Giấy',
                    categoryId: 4,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639403392/courses/cwgxzm2wmphqd7ajmn6g.jpg courses/cwgxzm2wmphqd7ajmn6g',
                    verified: 1,
                },
                {
                    name: 'Quản lý thời gian hiệu quả',
                    description:
                        'Cứ đến kì thi thì deadline dí ngập mồm? Đêm nộp kiểm thử mà 9 rưỡi tối vẫn còn nhởn nhơ? Hãy tham gia khóa học này chứ đừng để chết dưới đống bài tập mà hạn từ 5 tuần trước giống như thằng Hiếu!',
                    categoryId: 5,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639403728/courses/ckt1mkzpk7vduvr9ro2v.jpg courses/ckt1mkzpk7vduvr9ro2v',
                    verified: 1,
                },
                {
                    name: 'Vẫn là quản lý thời gian nhưng mà mô tả thì khác',
                    description:
                        'Quên kiểm thử đê bài AI 11h đêm nộp mà 10 rưỡi xin bài để chép thì đúng là không còn gì để nói! Đừng như thằng Văn Anh, hãy tham gia với chúng tôi để bớt xao nhãng khi học bài!',
                    categoryId: 5,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639403826/courses/c5r4hv8sdro1bvirdbhe.jpg courses/c5r4hv8sdro1bvirdbhe',
                    verified: 1,
                },
                {
                    name: 'Critical Thinking Strategies For Better Decisions',
                    description:
                        'Upgrade your problem solving skills and optimize business outcomes by applying the critical thinking process.',
                    categoryId: 6,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639403858/courses/lwvimz5h3kzruhluhgo6.jpg courses/lwvimz5h3kzruhluhgo6',
                    verified: 1,
                },
                {
                    name: 'Become a SuperLearner® 2: Learn Speed Reading & Boost Memory',
                    description:
                        'The original course to learn faster & more easily using the skills of the worlds fastest readers & memory record holders',
                    categoryId: 5,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639403896/courses/wj4bq7byd4pqlu5ahsgi.jpg courses/wj4bq7byd4pqlu5ahsgi',
                    verified: 1,
                },
                {
                    name: 'Anxiety Tool Kit',
                    description:
                        'Eliminate your anxiety and associated depression - A practical course to reclaim your joy and complete control.',
                    categoryId: 5,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639403945/courses/isqlhn6i607fxuejne3e.jpg courses/isqlhn6i607fxuejne3e',
                    verified: 1,
                },
                {
                    name: 'Learn Ethical Hacking From Scratch',
                    description:
                        'Become an ethical hacker that can hack computer systems like black hat hackers and secure them like security experts.',
                    categoryId: 1,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639404361/courses/zyqvujs1xbywpk9rsupv.jpg courses/zyqvujs1xbywpk9rsupv',
                    verified: 1,
                },
                {
                    name: 'The Complete Cyber Security Course : Hackers Exposed!',
                    description:
                        'Volume 1 : Become a Cyber Security Specialist, Learn How to Stop Hackers, Prevent Hacking, Learn IT Security & INFOSEC',
                    categoryId: 1,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639404383/courses/kfzniccg064dlmjktroi.jpg courses/kfzniccg064dlmjktroi',
                    verified: 1,
                },
                {
                    name: 'The Complete Networking Fundamentals Course. Your CCNA start',
                    description:
                        'Volume 1 : Become a Cyber Security Specialist, Learn How to Stop Hackers, Prevent Hacking, Learn IT Security & INFOSEC',
                    categoryId: 1,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639404406/courses/dqyebkpzalnpgwehkkdi.jpg courses/dqyebkpzalnpgwehkkdi',
                    verified: 1,
                },
                {
                    name: 'The Complete Oracle SQL Certification Course',
                    description:
                        "Don't Just Learn the SQL Language, Become Job-Ready and Launch Your Career as a Certified Oracle SQL Developer!",
                    categoryId: 1,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639404449/courses/jdhgysqi62hwrcwxmble.jpg courses/jdhgysqi62hwrcwxmble',
                    verified: 1,
                },
                {
                    name: 'Linux Command Line Basics',
                    description:
                        "This is an introductory course to the Linux command Line. It's great for both Linux beginners and advanced Linux users.",
                    categoryId: 6,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639404472/courses/a9pfuqidwlhdmny4fjmi.jpg courses/a9pfuqidwlhdmny4fjmi',
                    verified: 1,
                },
                {
                    name: 'The Ultimate Drawing Course - Beginner to Advanced',
                    description:
                        'Use Blender to Create Beautiful 3D models for Video Games, 3D Printing & More. Beginners Level Course',
                    categoryId: 7,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639404651/courses/rfxkhel9ewuobfwim7oa.jpg courses/rfxkhel9ewuobfwim7oa',
                    verified: 1,
                },
                {
                    name: 'Complete Blender Creator: Learn 3D Modelling for Beginners',
                    description:
                        'Use Blender to Create Beautiful 3D models for Video Games, 3D Printing & More. Beginners Level Course',
                    categoryId: 7,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639404686/courses/me2twjgi1qixkwf1crtd.jpg courses/me2twjgi1qixkwf1crtd',
                    verified: 1,
                },
                {
                    name: 'Drawing and Painting on the iPad with Procreate',
                    description:
                        'Learn everything you need to know about Procreate with hands on drawing lessons. Now updated for Procreate 5',
                    categoryId: 7,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1639404711/courses/wbrp05jtzisj3u0gwz8a.jpg courses/wbrp05jtzisj3u0gwz8a',
                    verified: 1,
                },
                {
                    name: 'Khóa học C++ căn bản',
                    description:
                        'Dành cho học viên bắt đầu tiếp cận với lập trình',
                    categoryId: 1,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1637942420/courses/nbcb5ikwflvkvpt5aklt.jpg courses/nbcb5ikwflvkvpt5aklt',
                    verified: 1,
                },
                {
                    name: 'Khóa học C++ nâng cao',
                    description: 'Khóa học tiếp theo của khóa C++ căn bản',
                    categoryId: 2,
                    instructorId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/subarashis/image/upload/v1637942420/courses/nbcb5ikwflvkvpt5aklt.jpg courses/nbcb5ikwflvkvpt5aklt',
                    verified: 1,
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
