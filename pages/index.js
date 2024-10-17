import Image from "next/image";
import { LineChart001 } from "@/components/line-chart-001";
import { Bar_011 } from "@/components/bar-001";
import { Line_multiaxis } from "@/components/line-multiaxis-001";
import { Doughnut_01 } from "@/components/doughnut-001";
import { Bar_022 } from "@/components/bar-002";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Books Data Visualization</h1>

      <section className="z-10 max-w-5xl w-full mb-12 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">แผนภูมิเส้น: แสดงประเภทและจำนวนของหนัง</h2>
        <LineChart001 />
        <p className="mt-4 text-gray-600">
        แผนภูมิเส้นนี้แสดงแนวโน้มจำนวนประเภทของหนังสือทั้งหมด ซึ่งแสดงให้เห็นว่าจากฐานข้อมูลหนังสือ มีจำนวนหนังสือ ประเภท Fantasy มากที่สุด
        </p>
      </section>

      <section className="z-10 max-w-5xl w-full mb-12 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">แผนภูมิแท่ง: แสดงจำนวนหนังสือที่เปิดตัวก่อนและหลังปี ค.ศ.2000</h2>
        <Bar_011 />
        <p className="mt-4 text-gray-600">
        แผนภูมิแท่งนี้ แสดงจำนวนหนังสือที่เปิดตัวก่อนและหลังปี ปี ค.ศ.2000 ซึ่งแสดงให้เห็นว่าจากฐานข้อมูล มีจำนวนหนังสือที่เปิดตัวก่อนปี ค.ศ.2000 จำนวน 150 เล่ม และเปิดตัวหลังปี ค.ศ.2000 จำนวน 391 เล่ม
        </p>
      </section>

      <section className="z-10 max-w-5xl w-full mb-12 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">แผนภูมิเส้น: แสดงจำนวนของหนังสือแต่ละประเภทโดยแบ่งเป็นก่อนและหลัง ปี ค.ศ.2000</h2>
        <Line_multiaxis />
        <p className="mt-4 text-gray-600">
        แผนภูมิเส้นนี้แสดงแนวโน้มจำนวนประเภทของหนังสือ โดยแยกตามปีที่เผยแพร่ เป็นก่อนและหลัง ปี ค.ศ.2000 ซึ่งแสดงให้เห็นว่าจากฐานข้อมูล ช่วงเวลาก่อน ปี ค.ศ.2000 ประเภทหนังสือที่ได้รับการเผยแพร่มากที่สุดคือ หนังสือประเภท บันเทิงคดีแนววิทยาศาสตร์ หรือ ไซ-ไฟ <br/>
        ช่วงเวลาหลังปี ค.ศ.2000 ประเภทหนังสือที่ได้รับการเผยแพร่มากที่สุดคือ หนังสือประเภท บันเทิงคดีแนวจินตนิมิต หรือ แฟนตาซี
        </p>
      </section>

      <section className="z-10 max-w-5xl w-full mb-12 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">กราฟโดนัท: เปรียบเทียบประเภทของหนังสือ</h2>
        <Doughnut_01 />
        <p className="mt-4 text-gray-600">
        กราฟโดนัทนี้ แสดงข้อมูลเปรียบเทียบจำนวนของหนังสือ 2 ประเภท คือแฟนตาซี และ ไซ-ไฟ ซึ่งแสดงให้เห็นว่าจากฐานข้อมูลหนังสือทั้งหมด มีจำนวนหนังสือประเภท แฟนตาซี จำนวน 150 เล่ม และประเภท ไซ-ไฟ จำนวน 56 เล่ม
        </p>
      </section>

      <section className="z-10 max-w-5xl w-full mb-12 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">แผนภูมิแท่ง: แสดงข้อมูลเปรียบเทียบอายุของหนังสือ</h2>
        <Bar_022 />
        <p className="mt-4 text-gray-600">
        แผนภูมิแท่ง แสดงข้อมูลเปรียบเทียบอายุของหนังสือ โดยแยกตามปีที่เผยแพร่ ซึ่งแสดงให้เห็นว่าจากฐานข้อมูลหนังสือทั้งหมด มีหนังสือที่มีอายุเกิน 100 ปี จำนวน 32 เล่ม และหนังสือที่มีอายุไม่ถึง 100 ปี จำนวน 509 เล่ม
        </p>
      </section>

      
    </main>
  );
}
