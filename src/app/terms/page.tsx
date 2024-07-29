"use client"
import { LucideArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { GradientBackground } from '~/landing/components/gradient-background';

export default function TermsAndConditions() {

    const router = useRouter()
    const goBack = () => {
        router.back()
    }

    return (
        <>
            <div className="w-3xl md:w-11/12 mx-auto mt-4">
                <button onClick={goBack}>
                    <LucideArrowLeft size={30} />
                </button>
            </div>
            <GradientBackground />
            <div className="w-3xl md:w-11/12 mx-auto p-6 bg-white rounded-lg shadow-md mt-4 mb-8">
                <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                    <p className="text-gray-700 mb-4">
                        Welcome to Mempal Headquarters. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, you should not use our services.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li><strong>Service</strong>: Refers to the text processing and flashcard generation services provided by Mempal.</li>
                        <li><strong>User</strong>: Any individual or entity that accesses or uses our services.</li>
                        <li><strong>Account</strong>: A user profile created on our platform to access and use our services.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">3. User Registration</h2>
                    <p className="text-gray-700 mb-4">
                        To access certain features of our services, you may need to create an account. You agree to provide accurate, complete, and up-to-date information during the registration process and to update such information to keep it accurate, complete, and current.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">4. Use of Services</h2>
                    <p className="text-gray-700 mb-4">
                        You agree to use our services only for lawful purposes and in accordance with these Terms. You shall not:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>Use our services in any way that violates any applicable federal, state, or local law or regulation.</li>
                        <li>Use our services to transmit or distribute any unsolicited or unauthorized advertising, promotional materials, spam, or any other form of solicitation.</li>
                        <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with any person or entity.</li>
                        <li>Engage in any activity that disrupts or interferes with the functioning of our services or the servers and networks connected to our services.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">5. Fees and Payment</h2>
                    <p className="text-gray-700 mb-4">
                        <strong>Subscription Plans</strong>: We offer various subscription plans as described on our website. The details and pricing for each plan are subject to change.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Payment</strong>: All payments are processed through secure payment gateways. You agree to provide accurate and complete payment information and authorize us to charge the payment method you provide for the applicable fees.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Refunds</strong>: Refunds are provided according to our refund policy. Please refer to our refund policy for more details.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">6. User Content</h2>
                    <p className="text-gray-700 mb-4">
                        <strong>Ownership</strong>: You retain ownership of the content you upload to our platform. By uploading content, you grant us a worldwide, non-exclusive, royalty-free, and transferable license to use, reproduce, modify, publish, and distribute such content solely for the purpose of providing our services.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Responsibility</strong>: You are solely responsible for any content you upload and ensure that such content does not infringe on any third-party rights or violate any laws.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
                    <p className="text-gray-700 mb-4">
                        <strong>Trademarks</strong>: All trademarks, service marks, and logos used in connection with our services are the property of Mempal Headquarters or their respective owners.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Copyright</strong>: All content and materials available through our services are protected by copyright laws and are the property of Mempal Headquarters or its licensors.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">8. Privacy</h2>
                    <p className="text-gray-700 mb-4">
                        Our Privacy Policy describes how we collect, use, and protect your personal information. By using our services, you agree to the terms of our Privacy Policy.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
                    <p className="text-gray-700 mb-4">
                        To the fullest extent permitted by law, Mempal Headquarters shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>Your use or inability to use our services.</li>
                        <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
                        <li>Any interruption or cessation of transmission to or from our services.</li>
                        <li>Any bugs, viruses, or the like that may be transmitted to or through our services.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
                    <p className="text-gray-700 mb-4">
                        You agree to indemnify, defend, and hold harmless Mempal Headquarters and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys&apos; fees, arising out of or in any way connected with your use of our services, your violation of these Terms, or your violation of any rights of another party.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
                    <p className="text-gray-700 mb-4">
                        We reserve the right to terminate or suspend your account and access to our services, without prior notice or liability, for any reason, including if we believe that you have violated these Terms. Upon termination, your right to use our services will immediately cease.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
                    <p className="text-gray-700 mb-4">
                        We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on our website. You are advised to review these Terms periodically for any changes. Your continued use of our services after any changes to these Terms constitutes your acceptance of the new Terms.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
                    <p className="text-gray-700 mb-4">
                        These Terms shall be governed by and construed in accordance with the laws of Argentina, without regard to its conflict of law principles.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">14. Dispute Resolution</h2>
                    <p className="text-gray-700 mb-4">
                        Any disputes arising out of or relating to these Terms or our services shall be resolved through binding arbitration in Argentina, in accordance with the rules of the American Arbitration Association or a similar arbitration body. The arbitrator’s decision shall be final and binding, and judgment on the arbitration award may be entered in any court having jurisdiction. The prevailing party in any arbitration or legal action shall be entitled to recover its reasonable attorneys&apos; fees and costs.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
                    <p className="text-gray-700 mb-4">
                        If you have any questions about these Terms, please contact us at:
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Email:</strong> mempalhq.contact@gmail.com
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">16. Miscellaneous</h2>
                    <p className="text-gray-700 mb-4">
                        <strong>Severability:</strong> If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Mempal Headquarters regarding your use of our services and supersede all prior agreements and understandings.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Waiver:</strong> The failure of Mempal Headquarters to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Assignment:</strong> You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. We may freely assign these Terms without restriction.
                    </p>
                </section>
            </div>
        </>
    );
};

